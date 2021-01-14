
const fs = require('../../../index')
//fs.fs

module.exports = async (req, res) => {
    const uid = req.params.id
    const batch = fs.fs.batch()

    try {

        const user =  (await fs.fs.collection('user').doc(uid).get()).data()

        const adminExists = (await fs.fs.collection('admin').doc(uid).get()).data()

        if(adminExists) {
            return res.status(400).json({message: 'Admin Already Exists'})
        }

        if (!user) {
            return res.status(404).json({message: 'User Not Found'})
        }
        
        delete user.tickets
        user.role = 'admin'

        batch.update(fs.fs.collection('user').doc(uid), {'role': 'admin'})
        batch.set(fs.fs.collection('admin').doc(uid), user)

        await batch.commit()
        res.status(200).json({message: 'Successful'})


    } catch(error) {
        // console.log(error)
        res.status(500).json({message: 'Server Error'})
    }
    
}