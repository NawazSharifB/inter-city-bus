const express = require('express')
const router = express.Router()

const emailValidator = require('./email-validity')
const phoneValidator = require('./phone-validity')


router.get('/email-validity/:email', emailValidator)
router.get('/phone-validity/:phone', phoneValidator)

module.exports = router