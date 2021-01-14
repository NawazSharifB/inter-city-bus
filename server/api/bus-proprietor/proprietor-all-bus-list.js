const fs = require('../../../index')
// fs.fs

module.exports = async (req, res) => {
    const userData = req.userData

    try {
        const busList = []
        
        const fsBus = await fs.fs.collection('bus').doc(userData.busName).collection('bus').get()
        
        fsBus.forEach( bus => {
            const busInfo = bus.data()
            
            if(busInfo.busName) {
                busList.push(busInfo)
            }
        })

        res.status(200).json(busList)
    } catch(error) {
        // console.log(error)
        res.status(500).json({message: 'Server Error'})
    }

}
