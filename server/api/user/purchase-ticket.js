const fs = require('../../../index')
//fs.fs

//busName
//busuid
//date
// seatArray
// journey time
// startPoint
// endPoint
// fare
//bus number

module.exports = async (req, res) => {
    const purchaseInfo = req.body
    // console.log(purchaseInfo)
    const userData = req.userData
    purchaseInfo.date = new Date(purchaseInfo.date + 21600000)
    // purchaseInfo.date = new Date(purchaseInfo.date)

    const batch = fs.fs.batch()
    const busRef = fs.fs.collection('bus').doc(purchaseInfo.busName).collection('bus').doc(purchaseInfo.busUid)
    const userRef = fs.fs.collection('user').doc(userData.uid)

    const d = new Date(purchaseInfo.date)
    const date = d.getMonth() + '.'+ d.getDate() + '.' + d.getFullYear()

    try {
        await fs.fs.runTransaction( async t => {
            const info = await Promise.all([t.get(busRef),
                                            t.get(userRef)])
    
            const busInfo = info[0].data()
            const userInfo = info[1].data()
            // console.log(busInfo)
            // console.log(userInfo)

            const d = purchaseInfo.date
            const date = d.getMonth() + '.'+ d.getDate() + '.' + d.getFullYear()

            const indexOfStartPoint = busInfo.busStopNames.indexOf(purchaseInfo.startPoint)
            const indexOfEndPoint = busInfo.busStopNames.indexOf(purchaseInfo.endPoint)

            const travelPoints = []

            for(let i = indexOfStartPoint; i<= indexOfEndPoint; i++) {
                travelPoints.push(busInfo.busStopNames[i])
            }
            // console.log('travelpoints', travelPoints)
    
            if(busInfo.seatCounter.hasOwnProperty(date)) {
                // console.log('date exists')

                for(let i = 0; i < travelPoints.length; i++) {
                    if((busInfo.seatCounter[date].seatCounter[travelPoints[i]].length + purchaseInfo.seatArray.length) <= busInfo.availableSeat) {
                        purchaseInfo.seatArray.forEach( seat => {
                            if (busInfo.seatCounter[date].seatCounter[travelPoints[i]].includes(seat)) {
                                // console.log('seat is already booked', seat)
                                throw {
                                    message : 'Expected Seat Are Not Available',
                                    code: 2000
                                }
                            } else {
                                busInfo.seatCounter[date].seatCounter[travelPoints[i]].push(seat)
                            }
                        })

                    } else {
                        // console.log('no seat available')
                        throw {
                            code: 1000,
                            message: 'Seat Unavailable'
                        }
                    }
                }
    
            } else {
                // console.log('date doesnt exist')
                // date is not available creat date obj and insert seats to unavailable seats
                busInfo.seatCounter[date] = {}
                busInfo.seatCounter[date].seatCounter = {}
                
                busInfo.busStopNames.forEach(busStop => {
                    busInfo.seatCounter[date].seatCounter[busStop] = []
                })

                for(let i = 0; i < travelPoints.length; i++) {
                    // console.log(travelPoints[i])
                    busInfo.seatCounter[date].seatCounter[travelPoints[i]].push(...purchaseInfo.seatArray)
                }

            }

            //managing userInfo
            purchaseInfo.date = new Date(purchaseInfo.date - 21600000)
            // purchaseInfo.date = new Date(purchaseInfo.date)
            if (userInfo.tickets.upcoming.hasOwnProperty(date)) {
                // console.log('data for that date exists')
                //checking if tickets for same bus, date and places already has been purchased
                
                const sameBus = userInfo.tickets.upcoming[date].filter(ticket => {
                    // console.log('-------------------')
                    // console.log('purchased ticket info')
                    // console.log('bus uid', ticket.busUid)
                    // console.log('date', ticket.date)
                    // console.log('start point', ticket.startPoint)
                    // console.log('end point', ticket.endPoint)
                    // console.log('----------------------')
                    // console.log('----------------------')
                    // console.log('new ticket info')
                    // console.log('bus uid', purchaseInfo.busUid)
                    // console.log('date', purchaseInfo.date.toISOString())
                    // console.log('start point', purchaseInfo.startPoint)
                    // console.log('end point', purchaseInfo.endPoint)
                    // console.log('-----------------')
                    if ( ticket.busUid === purchaseInfo.busUid && 
                        ticket.date === purchaseInfo.date.toISOString() && 
                        ticket.startPoint === purchaseInfo.startPoint &&
                        ticket.endPoint === purchaseInfo.endPoint
                        ) {
                        return ticket
                    }
                })

                if (sameBus.length) {
                    // merging two tickets. tickets for same bus, date place were purchased before
                    const bus = sameBus[0]
                    
                    // checking if tickets are more than 5
                    if ((bus.seatArray.length + purchaseInfo.seatArray.length) > 5) {
                        // can't purchase more than 5 tickets of a same bus of that date and time
                        throw {
                            code: 3000,
                            message: `You Have Already Purchased ${bus.seatArray.length} Tickets Of This Bus. You Can Purchase Maximum ${5 - bus.seatArray.length } More Tickets`
                        }    
                    }

                    bus.fare += purchaseInfo.fare
                    bus.seatArray.push(...purchaseInfo.seatArray)

                } else {
                    userInfo.tickets.upcoming[date].push(purchaseInfo)
                }
            } else {
                // console.log('data for that date doesnt exist')
                userInfo.tickets.upcoming[date] = []
                userInfo.tickets.upcoming[date].push(purchaseInfo)
            }


            // console.log('final',busInfo.seatCounter[date].seatCounter)
            // console.log('final', userInfo.tickets.upcoming)
  
            // console.log(userInfo)
            purchaseInfo.date = new Date(purchaseInfo.date).toISOString()
            await Promise.all([t.update(userRef, {'tickets.upcoming': userInfo.tickets.upcoming}), t.update(busRef, {seatCounter: busInfo.seatCounter})])
            // console.log('saved data')
        })
        // console.log('if this one is trying to hit')
        res.status(200).json({message: 'Successfully Purchase Ticket'})

    } catch(error) {
        if (error.code && error.code > 999) {
            if (error.code === 1000) {
                return res.status(404).json({message: error.message})
                
            } else if (error.code ===2000) {
                return res.status(404).json({message: error.message})
                
            } else if (error.code === 3000) {
                return res.status(400).json({message: error.message})
            }
            return res.status(500).json({message: 'Server Error'})
            
        }
        return res.status(500).json({message: 'Server Error'})
    }

}
