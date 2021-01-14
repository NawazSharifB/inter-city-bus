const jwt  = require('jsonwebtoken')
const index = require('../../index')

module.exports = async (req, res, next) => {
    const userData = req.userData;
    // console.log('hit admin middleware')

    if (!userData.uid || userData.role !== 'admin') {
        return res.status(403).json({message: 'Forbidden Request'});
    }
    try {

        const fsUsers = await index.fs.collection('admin').where('uid', '==', userData.uid).get();

        const users = [];
        fsUsers.forEach(u => users.push(u.data()));
        if (!users.length > 0) {
            // console.log('no users found')
            return res.status(403).json({message: 'Forbidden Request'});
        }
        const user = users[0];

        if (user.role === userData.role) {
            // console.log('user is admin');
            next();
        } else {
            return res.status(403).json({message: 'Forbidden Request'});
        }
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
};
