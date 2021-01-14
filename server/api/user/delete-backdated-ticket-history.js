const index = require('../../../index')

module.exports = async(req, res, next) => {
    const userData = req.userData
    const fs = index.fs
    try {

        const userInfo = await fs.collection('user').doc(userData.uid).update({'tickets.backDated': []})
        res.status(200).json({message: 'Successfully Deleted Backdated Purchase History'})
    } catch(error) {
        // console.log(error)
        res.status(500).json({message: 'Server Error'})
    }
}