const express = require('express')
const customerRouter = express.Router()
const CustomerController = require('../controllers/customerController')

// localhost /customer
customerRouter.get('/', CustomerController.getListItems )
customerRouter.get('/buy/:itemId', CustomerController.buyItem )
customerRouter.get('/profile', CustomerController.profile)
customerRouter.post('/profile', CustomerController.postProfile)

module.exports = customerRouter