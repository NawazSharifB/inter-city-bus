const fs = require('../../../index')
// fs.fs

module.exports = async (req, res) => {
    const searchInfo = req.body
    let filteredBusList = [];
    let unAvailableSeatsArr = []

    searchInfo.date = new Date(searchInfo.date + 21601000)
    // searchInfo.date = new Date(searchInfo.date)

    /*
    from: 'rajshahi',
    to: 'dhaka',
    date:'Date',
    preferredTime: 600,
    busType: 'All'
    */
    try {

        // console.log('searhcing for bus list')
        const fsBusList = await fs.fs.collectionGroup('bus').where('busStopNames', 'array-contains', 'Rajshahi').get()
        // console.log('found bus list from database')
        
        let unFilteredBusList = []
        

        fsBusList.forEach(bus => {
            unFilteredBusList.push(bus.data())
        })
        // console.log('bus list', unFilteredBusList)

        const busList = filterBus(unFilteredBusList)
        // console.log(busList)
        res.status(200).json(busList)


        // filtering database buses according to user date
        function filterBus(busList) {
            busList = busList.filter( bus => {
                return bus.busStopNames.includes(searchInfo.from) && 
                bus.busStopNames.includes(searchInfo.to) && 
                (bus.busStopNames.indexOf(searchInfo.from) < bus.busStopNames.indexOf(searchInfo.to)) && 
                bus.onDays.includes(new Date(searchInfo.date).getDay()) &&
                (( searchInfo.busType !== 'All' && searchInfo.busType ===  bus.busType) || ( searchInfo.busType === 'All'))
            })
            
            // console.log('from 62', busList.length)
            const searchDate = searchInfo.date
            // console.log(searchDate)
            let today = new Date(Date.now() + 21600000)
            // let today = new Date(Date.now())
            // console.log('____________________________')
            // console.log('search date')
            // console.log('what client sent', searchInfo.date)
            // console.log('date', searchDate.getDate())
            // console.log('full year', searchDate.getFullYear())
            // console.log('month', searchDate.getMonth())
            // console.log('day', searchDate.getDay())
            // console.log('utc', searchDate.getUTCDate())
            // console.log('-----------------------------')
            // console.log('____________________________')
            // console.log('today date')
            // console.log('today time', today.getTime())
            // console.log('date', today.getDate())
            // console.log('full year', today.getFullYear())
            // console.log('month', today.getMonth())
            // console.log('day', today.getDay())
            // console.log('utc', today.getUTCDay())
            // console.log('------------------------------')
            if (searchDate.getDate() === today.getDate() && 
                searchDate.getFullYear() === today.getFullYear() &&
                searchDate.getMonth() === today.getMonth()) {
                    // console.log('hit todays bus')
                    busList = busList.filter( bus => {
                        const index = bus.busStopNames.indexOf(searchInfo.from)

                        today = new Date(Date.now() + 21600000 + 300000)
                        // today = new Date(Date.now() + 300000)
                        const time = ((today.getHours() * 100) + today.getMinutes());
                        // console.log('----------- checking time---------')
                        // console.log('hour', today.getHours())
                        // console.log('minute', today.getMinutes())
                        // console.log(typeof today.getHours())
                        // console.log('time', time)
                        // console.log('bus stop time', bus.busNumber, bus.busStopSchedules[index])
                        // console.log('----------- checking time---------')
                        return time <= bus.busStopSchedules[index]
                    })
                } else {
                    // console.log('not today bus')
                }
    
            if ( !busList || !(busList.length >= 0)) {
                return busList
            }
    
            // creating list of bus information
            busList = busList.map( bus => {
                // console.log(56, bus)
                // (busName, busNumber, busStartPoint, busEndPoint, journeyStartPoint, journeyEndPoint, journeyStartTime, date, fare, availableSeat, busType)
                const fare = calculateFare(bus);
                // console.log('fare', fare)
                const busInfo = new BusInfo(bus.busName, bus.busNumber, bus.startPoint, bus.endPoint,
                    searchInfo.from, searchInfo.to, bus.busStopSchedules[bus.busStopNames.indexOf(searchInfo.from)], bus.busStopSchedules[bus.busStopNames.indexOf(searchInfo.to)],
                    (searchInfo.date - 21601000), fare, calculateAvailableSeat(bus), unAvailableSeatsArr, bus.seatPattern, bus.busType, bus.uid)
                    // (searchInfo.date), fare, calculateAvailableSeat(bus), unAvailableSeatsArr, bus.seatPattern, bus.busType, bus.uid)
                // console.log(61, busInfo);
                return busInfo;
            })
    
            // sorting buses according to user preferred-schedule
            busList.sort((a, b) => {
                return ((a.journeyStartTime - searchInfo.preferredTime) < 0 ? ((b.journeyStartTime - searchInfo.preferredTime) + 2400) : (a.journeyStartTime - searchInfo.preferredTime)) -
                ((b.journeyStartTime - searchInfo.preferredTime) < 0 ? ((a.journeyStartTime - searchInfo.preferredTime) + 2400) : (b.journeyStartTime - searchInfo.preferredTime))
            })
            return busList
        }
    
    
        // creating object date 1.20.2020
        function createDate(date) {
            const d = new Date(date)
            return d.getMonth() + '.'+ d.getDate() + '.' + d.getFullYear()
        }
    
    
        // calculating fare for user travel points for lowest price
        function calculateFare(bus) {
            
            for(let i = bus.busStopNames.indexOf(searchInfo.from); i >= 0; i--) {
                if (bus.fromBusStopNamesForFare.includes(bus.busStopNames[i])) {
                    fromArr = []
                    toArr = []
                    for(let j = 0; j < bus.fromBusStopNamesForFare.length; j++) {
                        if(bus.fromBusStopNamesForFare[j] === bus.busStopNames[i]) {
                            // console.log('searching in from array')
                            fromArr.push(j)
                        }
                    }
                    for(let k = bus.busStopNames.indexOf(searchInfo.to); k < bus.busStopNames.length; k++) {
                        if(bus.toBusStopNamesForFare.includes(bus.busStopNames[k])) {
                            for(let m = 0; m < bus.toBusStopNamesForFare.length; m++) {
                                if(bus.toBusStopNamesForFare[m] === bus.busStopNames[k]) {
                                    // console.log('searching in toarray')
                                    toArr.push(m)
                                }
                            }
                            break
                            // if(fromArr.length && toArr.length) {
                            //     console.log('fromarr', fromArr)
                            //     console.log('toarr', toArr)
                            //     for(let n = 0; n < ((fromArr.length >= toArr.length) ? fromArr.length : toArr.length); n++) {
                            //         // console.log(n)
                            //         // console.log(toArr.length)
                            //         // console.log(fromArr.length)
                            //         if(toArr.includes(fromArr[n])) {
                            //             // console.log(bus.fare[fromArr[n]])
                            //             console.log('found bus stop fare', bus.fare[fromArr[n]])
                            //             return bus.fare[fromArr[n]]
                            //         }
                            //     }
                            // }
                        }
                    }
    
    
                    if(fromArr.length && toArr.length) {
                        // console.log('fromarr', fromArr)
                        // console.log('toarr', toArr)
                        for(let n = 0; n < ((fromArr.length >= toArr.length) ? fromArr.length : toArr.length); n++) {
                            // console.log(n)
                            // console.log(toArr.length)
                            // console.log(fromArr.length)
                            if(toArr.includes(fromArr[n])) {
                                // console.log(bus.fare[fromArr[n]])
                                // console.log('found bus stop fare', bus.fare[fromArr[n]])
                                return bus.fare[fromArr[n]]
                            }
                        }
                    }
    
                }
            }
    
        }
    
        // calculating available seats for individual bus
        function calculateAvailableSeat(bus) {
            let date = new Date(searchInfo.date)
            unAvailableSeatsArr = []
            date = date.getMonth() + '.'+ date.getDate() + '.' + date.getFullYear()
            
            const travelPoints = []
            const indexOfStartPoint = bus.busStopNames.indexOf(searchInfo.from)
            const indexOfEndPoint = bus.busStopNames.indexOf(searchInfo.to)
    
    
                for(let i = indexOfStartPoint; i<= indexOfEndPoint; i++) {
                    travelPoints.push(bus.busStopNames[i])
                }
    
            if (!bus.seatCounter.hasOwnProperty(date)) {
                return bus.seatLimit
            } else {
                travelPoints.forEach(point => {
                    // console.log(point)
                    bus.seatCounter[date].seatCounter[point].forEach(seat => {
                        !unAvailableSeatsArr.includes(seat) ? unAvailableSeatsArr.push(seat) : null
                    })
                })
                // console.log(unAvailableSeatsArr, bus.uid)
                return bus.seatLimit - unAvailableSeatsArr.length
                // return bus.seatLimit - bus.seatCounter[date].unAvailableSeats.length
            }
    
        }

    } catch(error) {
        // console.log(error)
    }

    // console.log(searchInfo)
}


function BusInfo(busName, busNumber, busStartPoint, busEndPoint, journeyStartPoint, journeyEndPoint, journeyStartTime, arrivalTime, date, fare, availableSeat, unAvailableSeat, seatPattern, busType, uid) {
    this.busName = busName;
    this.busNumber = busNumber;
    this.busStartPoint = busStartPoint;
    this.busEndPoint = busEndPoint;
    this.journeyStartPoint = journeyStartPoint;
    this.journeyEndPoint = journeyEndPoint;
    this.journeyStartTime = journeyStartTime;
    this.arrivalTime = arrivalTime
    this.date = date;
    this.fare = fare;
    this.availableSeat = availableSeat;
    this.unAvailableSeat = unAvailableSeat;
    this.seatPattern = seatPattern;
    this.busType = busType;
    this.uid = uid;
}
