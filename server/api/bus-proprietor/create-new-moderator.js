const fs = require('../../../index')
//fs.fs

module.exports = async (req, res) => {
    const uid = req.params.id
    const batch = fs.fs.batch()

    // console.log(uid)

    const userData = {busName: 'Desh Travels'}

    try {

        const user =  (await fs.fs.collection('user').doc(uid).get()).data()

        const moderatorExists = (await fs.fs.collection('bus').doc(userData.busName).collection('moderator').doc(uid).get()).data()

        if(moderatorExists) {
            return res.status(400).json({message: 'Admin Already Exists'})
        }

        if (!user) {
            return res.status(404).json({message: 'User Not Found'})
        }
        
        delete user.tickets
        user.role = 'moderator'
        user.busName = userData.busName

        batch.update(fs.fs.collection('user').doc(uid), {'role': 'moderator'})
        batch.set(fs.fs.collection('bus').doc(userData.busName).collection('moderator').doc(uid), user)

        await batch.commit()
        res.status(200).json({message: 'Successful'})


    } catch(error) {
        // console.log(error)
        res.status(500).json({message: 'Server Error'})
    }
    
}