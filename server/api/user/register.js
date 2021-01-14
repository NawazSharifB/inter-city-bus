const bcrypt = require('bcryptjs')
const index = require('../../../index')
const jwt = require('jsonwebtoken')
//fs.fs

module.exports = async (req, res) => {
    const registerInfo = req.body

    registerInfo.uid = index.fs.collection('user').doc().id
    
    try {
        registerInfo.role = 'user'
        registerInfo.tickets = {
            upcoming: {},
            backDated: []
        }
        
        registerInfo.password = await bcrypt.hash(registerInfo.password, 10)
        await index.fs.collection('user').doc(registerInfo.uid).set(registerInfo)

        const token = jwt.sign({data: {
            name: registerInfo.firstName,
            email: registerInfo.email,
            uid: registerInfo.uid,
            role: registerInfo.role
        }}, index.jwtsecretKey, {expiresIn: '72h'})

        res.status(200).json(token)

    } catch(error) {
        // console.log(error)
    }
}