const fs = require('../../index')
//fs.fs

module.exports = (req, res) => {
    const email = req.params.email

    if(email) {
        const data = []
        // console.log('checking for email validity')
        fs.fs.collection('user').where('email', '==', email).get()
            .then(items => {
                items.forEach(item => {
                    data.push(0)
                })
                // console.log('email length', data.length)
                res.status(200).json({length: data.length})
            }).catch(error => {
                // console.log(error)
                res.status(500).json({message: 'Server Failed'})
            })
    } else {
        // console.log('no email was found 400')
        res.status(400).json({message: 'No Email was Provided'})
    }
}
