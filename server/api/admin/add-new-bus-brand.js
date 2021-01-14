const fs = require('../../../index')
// fs.fs

module.exports = async (req, res) => {
    const info = req.body
    // brandName
    // userUid
    try {
        
        // const user = (await fs.fs.collection('user').doc(info.userUid).get()).data()
        const databaseData = await Promise.all(
            [fs.fs.collection('user').doc(info.userUid).get(), 
            fs.fs.collection('bus').doc(info.brandName).get()])
        
        const user = databaseData[0].data()
        const bus = databaseData[1].data()

        if(!user) {
            return res.status(400).json({message: 'User Doesn\'t Exist'})
        }
        if(bus) {
            return res.status(400).json({message: 'Bus Already Exist'})
        }
        
        user.role = 'proprietor'
        user.busName = info.brandName

        // await Promise.all([
        //     fs.fs.collection('bus').doc(info.brandName).collection('bus').doc('1').set({}),
        //     fs.fs.collection('bus').doc(info.brandName).collection('moderator').doc('1').set({}),
        //     fs.fs.collection('bus').doc(info.brandName).collection('proprietor').doc(user.uid).set(user),
        //     fs.fs.collection('user').doc(user.uid).update({role: 'proprietor'})
        // ])

        const batch = fs.fs.batch()

        batch.set(fs.fs.collection('bus').doc(info.brandName).collection('bus').doc('1'), {})
        batch.set(fs.fs.collection('bus').doc(info.brandName).collection('moderator').doc('1'), {})
        batch.set(fs.fs.collection('bus').doc(info.brandName).collection('proprietor').doc(user.uid), user)
        batch.set(fs.fs.collection('bus').doc(info.brandName), {timestamp: Date.now()})
        batch.update(fs.fs.collection('user').doc(user.uid), {role: 'proprietor'})

        await batch.commit()

        res.status(200).json({message: 'Successful'})

    } catch(error) {
        // console.log(error)
        res.status(500).json({message: 'Server Error'})
    }

}