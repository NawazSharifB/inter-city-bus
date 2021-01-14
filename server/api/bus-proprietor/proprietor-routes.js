const express = require('express')

const addBus = require('./add-bus')
const createNewModerator = require('./create-new-moderator')
const editBus = require('./edit-bus')
const getEditBusInfo = require('./get-edit-bus-info')
const proprietorAllBusList = require('./proprietor-all-bus-list')
const proprietorFetchUser = require('./proprietor-fetch-user')

// const fs = require('../../../index')

const router = express.Router()



router.post('/add-bus', addBus)
router.get('/all-bus-list', proprietorAllBusList)
router.post('/edit-bus-info', editBus)
router.get('/get-edit-bus-info/:id', getEditBusInfo)
router.get('/fetch-user/:uid', proprietorFetchUser)
router.get('/:id', createNewModerator)

module.exports = router
