const fs = require('../../../index')
// fs.fs

module.exports = async (req, res) => {
    const uid = req.params.uid
    // console.log(uid);

    try {
        const userInfo = (await fs.fs.collection('user').doc(uid).get()).data()
        if(!userInfo) {
            // console.log(userInfo);
            return res.status(404).json({message: 'User Not Found'})
        }
        delete userInfo.password
        delete userInfo.tickets
        res.status(200).json(userInfo)
    } catch(error) {
        // console.log(error)
        res.status(500).json({message: 'Server Error'})
    }
}
