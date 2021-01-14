const fs = require('../../../index')
//fs.fs

module.exports = async (req, res) => {
    const userData = req.userData
    const busInfo = req.body
    

    try {
        const fsData = await Promise.all([
            fs.fs.collection('travel-points').doc('travel-points').get(),
            fs.fs.collection('bus')
                                .doc(userData.busName).collection('bus').where('busNumber', '==', busInfo.busNumber)
                                .where('startPoint', '==', busInfo.startPoint)
                                .where('busStopSchedules', 'array-contains', busInfo.busStopSchedules[0])
                                .get()
        ])
        // const busAlreadyExist = await fs.fs.collection('bus')
        //                         .doc(userData.busName).collection('bus').where('busNumber', '==', busInfo.busNumber)
        //                         .where('startPoint', '==', busInfo.startPoint)
        //                         .where('busStopSchedules', 'array-contains', busInfo.busStopSchedules[0])
        //                         .get()
        // console.log('got previous bus list')

        const busAlreadyExist = fsData[1]
        const travelPoints = fsData[0].data()['travel-points']
        
        if (sameBus(busAlreadyExist)) {
            // console.log('bus already exists')
            res.status(400).json({message: 'Bus Already Exists or Bus Is Occupied At That Day'})
            return
        }


        const uid = fs.fs.collection('bus').doc().id

        busInfo.uid = uid
        busInfo.availableSeat = busInfo.seatLimit
        busInfo.seatCounter = {}
        // const alphabetArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']

        // busInfo.seatsArray = []
        // const seArr = busInfo.seatPattern.split('x')
        // let numberOfSeatInRow = +seArr[0] + +seArr[1]

        // if(busInfo.seatLimit % numberOfSeatInRow === 0) {
        //     for(let i = 0; i < busInfo.seatLimit/numberOfSeatInRow; i++) {
        //         for(let j = 1; j <= numberOfSeatInRow; j++) {
        //             busInfo.seatsArray.push(alphabetArr[i]+j)
        //         }
        //     }
        // } else if(busInfo.seatLimit % numberOfSeatInRow === 1 && numberOfSeatInRow === 3) {
        //     for(let i = 0; i < Math.floor(busInfo.seatLimit/numberOfSeatInRow); i++) {
        //         for(let j = 1; j <= numberOfSeatInRow; j++) {
        //             busInfo.seatsArray.push(alphabetArr[i]+j)
        //         }
        //         if (i === Math.floor(busInfo.seatLimit/numberOfSeatInRow)) {
        //             busInfo.seatsArray.push(alphabetArr[i + 1]+1)
        //         }
        //     }

        // } else {
        //     for(let i = 0; i < Math.floor(busInfo.seatLimit/numberOfSeatInRow) - 1; i++) {
        //         for(let j = 1; j <= numberOfSeatInRow; j++) {
        //             busInfo.seatsArray.push(alphabetArr[i]+j)
        //         }
        //         if (i === (Math.floor(busInfo.seatLimit/numberOfSeatInRow) - 2)) {
        //             for(let k = 1; k <= (busInfo.seatLimit % numberOfSeatInRow + numberOfSeatInRow); k++) {
        //                 busInfo.seatsArray.push(alphabetArr[i + 1]+k)
        //             }
        //         }
        //     }
        // }



        // console.log('saving bus info')
        // travelPoints
        busInfo.busStopNames.forEach( point => {
            !travelPoints.includes(point) ? travelPoints.push(point) : null
        })
        
        await Promise.all([
            fs.fs.collection('travel-points').doc('travel-points').set({'travel-points': travelPoints}),
            await fs.fs.collection('bus')
                .doc(userData.busName).collection('bus').doc(busInfo.uid).set(busInfo)
        ])
        // await fs.fs.collection('bus')
        // .doc(userData.busName).collection('bus').doc(busInfo.uid).set(busInfo)
        // console.log('saved bus info')
        res.status(200).json({message: 'Successfully Save Bus Information'})





    } catch(error) {
        // console.log(error)
        res.status(500).json({message: 'Server Error'})
    }

    function sameBus(busArray) {
        const arr = []
        // console.log('checking if bus already exists')
        busArray.forEach(fsBus => {
            const bus = fsBus.data()
            if (bus.onDays.length === 7 || busInfo.onDays.some(day => bus.onDays.includes(day))) {
            if ((bus.busStopSchedules[0] <= busInfo.busStopSchedules[0] &&
                bus.busStopSchedules[bus.busStopSchedules.length - 1] >= busInfo.busStopSchedules[0]) ||
                (busInfo.busStopSchedules[0] > bus.busStopSchedules[bus.busStopSchedules.length - 1] &&
                busInfo.busStopSchedules[busInfo.busStopSchedules.length -1] > bus.busStopSchedules[0])) {
                    arr.push(0)
                }
            }
        })

        return arr.length ? true : false;
    }
}



// private busName: string,
// private busNumber: string,
// private busType: string,
// private onDays: number[],
// private seatLimit: number,
// private seatPattern: string,
// private startPoint: string,
// private endPoint: string,
// private busStopNames: string[],
// private busStopSchedules: number[],
// private fromBusStopNamesForFare: string[],
// private toBusStopNamesForFare: string[],
// private fare: number[]