const fs = require('../../../index')
// fs.fs

module.exports = async (req, res) => {
    const busUid = req.params.id
    const searchInfo = req.body
    const unAvailableSeatsArr = []
    /*
    from: 'rajshahi',
    to: 'dhaka',
    date:'Date',
    preferredTime: 600,
    busType: 'All'
    */

    let bus
    try {
        let busList =  await fs.fs.collectionGroup('bus').where('uid', '==', busUid).get()
        const buses = []
        busList.forEach(b => {
            buses.push(b.data())
        })
        bus = buses[0]
        bus =  new BusInfo(bus.busName, bus.busNumber, bus.startPoint, bus.endPoint, searchInfo.from, searchInfo.to, bus.busStopSchedules[bus.busStopNames.indexOf(searchInfo.from)],
            searchInfo.date, calculateFare(bus), calculateAvailableSeat(bus), unAvailableSeatsArr, bus.seatPattern, bus.busType, bus.uid)

        res.status(200).json(bus)

    } catch(error) {
        // console.log(error)
        res.status(500).json({message : 'Server Error'})
    }


    function calculateFare(bus) {
        
        for(let i = bus.busStopNames.indexOf(searchInfo.from); i >= 0; i--) {
            if (bus.fromBusStopNamesForFare.includes(bus.busStopNames[i])) {
                fromArr = []
                toArr = []
                for(let j = 0; j < bus.fromBusStopNamesForFare.length; j++) {
                    if(bus.fromBusStopNamesForFare[j] === bus.busStopNames[i]) {
                        fromArr.push(j)
                    }
                }
                for(let k = bus.busStopNames.indexOf(searchInfo.to); k < bus.busStopNames.length; k++) {
                    if(bus.toBusStopNamesForFare.includes(bus.busStopNames[k])) {
                        for(let m = 0; m < bus.toBusStopNamesForFare.length; m++) {
                            if(bus.toBusStopNamesForFare[m] === bus.busStopNames[k]) {
                                toArr.push(m)
                            }
                        }
                        break
                    }
                }

                if(fromArr.length && toArr.length) {
                    // console.log('fromarr', fromArr)
                    // console.log('toarr', toArr)
                    for(let n = 0; n < (fromArr.length > toArr.length) ? fromArr.length : toArr.length; n++) {
                        if(toArr.includes(fromArr[n])) {
                            // console.log(n)
                            // console.log(bus.fare[fromArr[n]])
                            return bus.fare[fromArr[n]]
                        }
                    }
                }

            }
        }

    }


    // function calculateAvailableSeat(bus) {
    //     let date = new Date(searchInfo.date)
    //     date = date.getMonth() + '.'+ date.getDate() + '.' + date.getFullYear()
        
    //     const travelPoints = []
    //     const indexOfStartPoint = bus.busStopNames.indexOf(searchInfo.from)
    //     const indexOfEndPoint = bus.busStopNames.indexOf(searchInfo.to)


    //         for(let i = indexOfStartPoint; i<= indexOfEndPoint; i++) {
    //             travelPoints.push(bus.busStopNames[i])
    //         }

    //     if (!bus.seatCounter.hasOwnProperty(date)) {
    //         return bus.seatLimit
    //     } else {
    //         travelPoints.forEach(point => {
    //             bus.seatCounter[date].seatCounter[point].forEach(seat => {
    //                 !unAvailableSeatsArr.includes(seat) ? unAvailableSeatsArr.push(seat) : null
    //             })
    //         })
    //         return bus.seatLimit - unAvailableSeatsArr.length
    //         // return bus.seatLimit - bus.seatCounter[date].unAvailableSeats.length
    //     }

    // }


    function calculateAvailableSeat(bus) {
        let date = new Date(searchInfo.date)
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
            
            return bus.seatLimit - unAvailableSeatsArr.length
            // return bus.seatLimit - bus.seatCounter[date].unAvailableSeats.length
        }

    }



    // function unAvailableSeats(bus) {
    //     let date = new Date(searchInfo.date)
    //     date = date.getMonth() + '.'+ date.getDate() + '.' + date.getFullYear()

    //     if (!bus.seatCounter.hasOwnProperty(date)) {
    //         return []
    //     } else {
    //         return bus.seatCounter[date].unAvailableSeats
    //     }
    // }


    
}


function BusInfo(busName, busNumber, busStartPoint, busEndPoint, journeyStartPoint, journeyEndPoint, journeyStartTime, date, fare, availableSeat, unAvailableSeats, seatPattern, busType, uid) {
    this.busName = busName;
    this.busNumber = busNumber;
    this.busStartPoint = busStartPoint;
    this.busEndPoint = busEndPoint;
    this.journeyStartPoint = journeyStartPoint;
    this.journeyEndPoint = journeyEndPoint;
    this.journeyStartTime = journeyStartTime;
    this.date = date;
    this.fare = fare;
    this.availableSeat = availableSeat;
    this.unAvailableSeats = unAvailableSeats;
    this.seatPattern = seatPattern;
    this.busType = busType;
    this.uid = uid;
}
