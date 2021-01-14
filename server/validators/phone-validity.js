const fs = require('../../index')
//fs.fs

module.exports = (req, res) => {
    const phone = +req.params.phone

    if(phone) {
        const data = []
        // console.log('checking for phone validity')
        fs.fs.collection('user').where('phone', '==', phone).get()
            .then(items => {
                items.forEach(item => {
                    data.push(0)
                })
                // console.log('phone length', data.length)
                res.status(200).json({length: data.length})
            }).catch(error => {
                // console.log(error)
                res.status(500).json({message: 'Server Failed'})
            })
    } else {
        // console.log('no phone was found 400')
        res.status(400).json({message: 'No Phone Number was Provided'})
    }
}
