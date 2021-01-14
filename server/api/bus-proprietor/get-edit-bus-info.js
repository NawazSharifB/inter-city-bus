const fs = require('../../../index')

module.exports = async (req, res) => {
    const userData = {busName: 'Desh Travels'}
    const uid = req.params.id
    try {
        const busInfo = (await fs.fs.collection('bus').doc(userData.busName).collection('bus').doc(uid).get()).data()
        
        if(busInfo) {
            delete busInfo.availableSeat
            delete busInfo.seatCounter
            res.status(200).json(busInfo)
        } else {
            res.status(404).json({message: 'Bus Not Found'})
        }

    } catch(error) {
        // console.log('error', error)
        res.status(500).json({message: 'Server Error'})
    }
    // console.log(busInfo.data());

}