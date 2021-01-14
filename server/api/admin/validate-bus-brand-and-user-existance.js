
const fs = require('../../../index')
// fs.fs

module.exports = async (req, res) => {
    const info = req.body
    // console.log(req.body.brandName)


    try {

        
        const searchInfo = await Promise.all([fs.fs.collection('bus').doc(info.brandName).get(),
        fs.fs.collection('user').doc(info.userUid).get()])
        
        const userInfo = searchInfo[1].data()
        const busInfo = searchInfo[0].data()
        // console.log(searchInfo[0].data())

        if(!busInfo) {
            return res.status(200).json({busNameAvailable: true, userInfo})
        } else {
            return res.status(200).json({busNameAvailable: false, userInfo})
        }

    } catch(error) {
        // console.log(error);
        res.status(500).json({message: 'Server Error'})
    }
}
