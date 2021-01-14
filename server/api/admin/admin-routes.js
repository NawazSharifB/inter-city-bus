const express = require('express')

const addNewBusBrand = require('./add-new-bus-brand')
const allBusList = require('./admin-all-bus-list')
const fetchUsers = require('./admin-fetch-user')
const createNewAdmin = require('./create-new-admin')
const validateBusBrandExistance = require('./validate-bus-brand-and-user-existance')


const router = express.Router()



router.post('/add-new-bus-brand', addNewBusBrand)
router.get('/all-bus-list', allBusList)
router.get('/fetch-user/:uid', fetchUsers)
router.get('/create-new-admin/:id', createNewAdmin)
router.post('/validate-bus-existance', validateBusBrandExistance)

module.exports = router