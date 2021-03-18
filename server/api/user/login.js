const bcrypt = require('bcryptjs')
const jwt  = require('jsonwebtoken')
const index = require('../../../index')

module.exports = async (req, res) => {
    // console.log('login hit hit')
    const loginInfo = req.body
    let users = {
        admin: [],
        proprietor: [],
        moderator: [],
        user: []
    }
    try {

        const usersArr = await Promise.all([
            index.fs.collection('admin').where('email', '==', loginInfo.email).get(),
            index.fs.collection('admin').where('phone', '==', +loginInfo.email).get(),
            index.fs.collectionGroup('proprietor').where('email', '==', loginInfo.email).get(),
            index.fs.collectionGroup('proprietor').where('phone', '==', +loginInfo.email).get(),
            index.fs.collectionGroup('moderator').where('email', '==', loginInfo.email).get(),
            index.fs.collectionGroup('moderator').where('phone', '==', +loginInfo.email).get(),
            index.fs.collection('user').where('email', '==', loginInfo.email).get(),
            index.fs.collection('user').where('phone', '==', +loginInfo.email).get(),
        ])

        usersArr[0].forEach( user => {
            users.admin.push(user.data())
        })
        usersArr[1].forEach( user => {
            users.admin.push(user.data())
        })
        usersArr[2].forEach( user => {
            users.proprietor.push(user.data())
        })
        usersArr[3].forEach( user => {
            users.proprietor.push(user.data())
        })
        usersArr[4].forEach( user => {
            users.moderator.push(user.data())
        })
        usersArr[5].forEach( user => {
            users.moderator.push(user.data())
        })
        usersArr[6].forEach( user => {
            users.user.push(user.data())
        })
        usersArr[7].forEach( user => {
            users.user.push(user.data())
        })

        if (users.admin.length) {
            // console.log('admin user',  users.admin[0])
            const passwordValidity = await bcrypt.compare(loginInfo.password, users.admin[0].password)
            
            if(passwordValidity) {
                const token = jwt.sign({data: {
                    name: users.admin[0].firstName,
                    phone: users.admin[0].phone,
                    email: users.admin[0].email,
                    uid: users.admin[0].uid,
                    role: users.admin[0].role
                // }}, index.jwtsecretKey, {expiresIn: '72h'})
                }}, index.jwtsecretKey)

                res.status(200).json(token)
            } else {
                res.status(401).json({message: 'Unauthorized password'})
            }

        } else if (users.proprietor.length) {
            // console.log('proprietor user',  users.proprietor[0])
            const passwordValidity = await bcrypt.compare(loginInfo.password, users.proprietor[0].password)
            
            if(passwordValidity) {
                const token = jwt.sign({data: {
                    name: users.proprietor[0].firstName,
                    phone: users.proprietor[0].phone,
                    email: users.proprietor[0].email,
                    uid: users.proprietor[0].uid,
                    role: users.proprietor[0].role,
                    busName: users.proprietor[0].busName
                // }}, index.jwtsecretKey, {expiresIn: '72h'})
                }}, index.jwtsecretKey)

                res.status(200).json(token)
            } else {
                res.status(401).json({message: 'Unauthorized password'})
            }

        } else if (users.moderator.length) {
            // console.log('moderator user', users.moderator[0])
            const passwordValidity = await bcrypt.compare(loginInfo.password, users.moderator[0].password)

            if(passwordValidity) {
                const token = jwt.sign({data: {
                    name: users.moderator[0].firstName,
                    phone: users.moderator[0].phone,
                    email: users.moderator[0].email,
                    uid: users.moderator[0].uid,
                    role: users.moderator[0].role,
                    busName: users.moderator[0].busName
                // }}, index.jwtsecretKey, {expiresIn: '72h'})
                }}, index.jwtsecretKey)

                res.status(200).json(token)
            } else {
                res.status(401).json({message: 'Unauthorized password'})
            }

        } else if (users.user.length) {
            // console.log('general user', users.user[0])
            const passwordValidity = await bcrypt.compare(loginInfo.password, users.user[0].password)

            if(passwordValidity) {
                const token = jwt.sign({data: {
                    name: users.user[0].firstName,
                    phone: users.user[0].phone,
                    email: users.user[0].email,
                    uid: users.user[0].uid,
                    role: users.user[0].role,
                // }}, index.jwtsecretKey, {expiresIn: '72h'})
                }}, index.jwtsecretKey)
                res.status(200).json(token)
            } else {
                res.status(401).json({message: 'Unauthorized password'})
            }

        } else {
            // console.log('user not found')
            res.status(401).json({message: 'Unauthorized Email/Phone'})
        }

    } catch(error) {
        // console.log(error)
        res.status(500).json({message: 'Server Error'})
    }

}