const express = require('express')

const isUserLoggedIn = require('../../middlewares/is-user-logged-in')

const login = require('./login')
const purchaseTicket = require('./purchase-ticket')
const purchasedTicketInfo = require('./purchased-tickets-info')
const register = require('./register')
const searchBus = require('./search-bus')
const selectedBusInfoToPurchaseTicket = require('./selected-bus-info-to-purchase-ticket')
const deletedBackDatedTicketHistory = require('./delete-backdated-ticket-history')
const getTravelPoints = require('./get-travel-points')

const router = express.Router()

router.post('/login', login)
router.get('/travel-points', getTravelPoints)
router.post('/purchase-ticket', isUserLoggedIn, purchaseTicket)
router.get('/purchased-ticket-info', isUserLoggedIn, purchasedTicketInfo)
router.delete('/delete-backdated-ticket-history', isUserLoggedIn, deletedBackDatedTicketHistory)
router.post('/register', register)
router.post('/search', searchBus)
router.post('/selected-bus-info-to-purchase-ticket/:id', selectedBusInfoToPurchaseTicket)


module.exports = router