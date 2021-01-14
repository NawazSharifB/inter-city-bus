const fs = require('../../../index')

module.exports = async (req, res, next) => {
    // console.log(req.headers.origin)
    try {
        const travelPoints = (await fs.fs.collection('travel-points').doc('travel-points').get()).data()
        res.status(200).json({travelPoints: travelPoints['travel-points']})
    } catch(error) {
        // console.log(error)
        res.status(500).json({message: 'Server Error'})
    }
}