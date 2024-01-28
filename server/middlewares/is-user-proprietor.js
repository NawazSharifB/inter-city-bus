const jwt  = require('jsonwebtoken')
const index = require('../../index')

module.exports = async (req, res, next) => {
    const userData = req.userData

    // console.log('hit proprietor middleware')

    // console.log('userData',userData)
    if (!userData.uid || userData.role !== 'proprietor') {
        // console.log('userData',userData)
        return res.status(403).json({message: 'Forbidden Request'})
    }
    try {

        const fsUsers = await index.fs.collectionGroup('proprietor').where('uid', '==', userData.uid).get()
        
        let users = []
        fsUsers.forEach(user => users.push(user.data()))
        // console.log('users', users)
        if (!users.length > 0) {
            // console.log('no users found')
            return res.status(403).json({message: 'Forbidden Request'})
        }
        const user = users[0]
        
        if ( user.role === userData.role && user.busName === userData.busName ) {
            // console.log('user is proprietor')
            next()
        } else {
            return res.status(403).json({message: 'Forbidden Request'})
        }
    } catch(error) {
        // console.log(error)
        res.status(500).json({message: 'Server Error'})
    }
}