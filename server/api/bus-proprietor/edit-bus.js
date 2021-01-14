const fs = require('../../../index')

module.exports = async (req, res) => {
    const userData = req.userData
    // console.log('edit bus-userdata', userData)
    const busInfo = req.body

    try {
        const fsTravelPoints = await fs.fs.collection('travel-points').doc('travel-points').get()

        const travelPoints = fsTravelPoints.data()['travel-points']

        busInfo.busStopNames.forEach(point => {
            !travelPoints.includes(point) ? travelPoints.push(point) : null;
        })
        
        await Promise.all([
            fs.fs.collection('travel-points').doc('travel-points').set({'travel-points': travelPoints}),
            fs.fs.collection('bus').doc(userData.busName).collection('bus').doc(busInfo.uid).update(busInfo)
        ])

        // const info = await fs.fs.collection('bus').doc(userData.busName).collection('bus').doc(busInfo.uid).update(busInfo)
        res.status(200).json({message: 'Successfully Updated Bus Information'})
    } catch(error) {
        // console.log(error)
        if (error.code === 5) {
            return res.status(404).json({message: 'Bus Not Found'})
        }
        res.status(500).json({message: 'Server Error'})
    }

}