const express = require('express')
const cors = require('cors')
const path = require('path')
const admin = require('firebase-admin')

const compression = require('compression')
// const fsConfig = require('./server/tools/firebase-config-file.json')


//middlewares
const isUserLoggedIn = require('./server/middlewares/is-user-logged-in')
const isUserAdmin = require('./server/middlewares/is-user-admin')
const isUserProprietor = require('./server/middlewares/is-user-proprietor')


//parent routes
const adminRoutes = require('./server/api/admin/admin-routes')
const proprietorRoutes = require('./server/api/bus-proprietor/proprietor-routes')
const userRoutes = require('./server/api/user/user-routes')


//validators route
const validatorsRoute = require('./server/validators/validators.routes')

admin.initializeApp({
    // credential: admin.credential.cert(fsConfig)
    credential: admin.credential.cert(JSON.parse(process.env.FS_CONFIG))
})
const fs = admin.firestore()

const app = express()
app.use(express.json())
// app.use(cors({
//     origin: 'http://localhost:4200',
// }))
app.use(cors({
    origin: 'https://nsb-inter-city-bus'
}))

// helper middlewares
app.use(compression())


const port = process.env.PORT || 3000

const jwtsecretKey = process.env.JWT_SECET_KEY

app.use(express.static(__dirname + '/dist/inter-city-bus'))

// app.get('/', (req, res) => {
//     res.send('server is working')
// })

// process.env.TZ = 'gmt+10'

app.use('/server-admin', isUserLoggedIn, isUserAdmin, adminRoutes)
app.use('/server-proprietor', isUserLoggedIn, isUserProprietor, proprietorRoutes)
app.use('/server-user', userRoutes)

app.use('/server-validator', validatorsRoute)

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/inter-city-bus/index.html'))
})


app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})

module.exports.fs = fs
module.exports.jwtsecretKey = jwtsecretKey

