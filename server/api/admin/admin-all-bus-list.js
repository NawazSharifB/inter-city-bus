const fs = require('../../../index')
// fs.fs

module.exports = async(req, res) => {
    const busList = []

    try {

        const fsBus = await fs.fs.collectionGroup('bus').get()
    
        fsBus.forEach( bus => {
            const busInfo = bus.data()
            if(busInfo.busName) {
                delete busInfo.availableSeat
                delete busInfo.seatCounter

                busList.push(busInfo)
            }
        })

        res.status(200).json(busList)
    } catch(error) {
        // console.log(error);
        res.status(500).json({message: 'Server Error'})
    }
}
