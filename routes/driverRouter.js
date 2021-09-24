const express = require('express')
const driverRouter = express.Router()
const DriverController = require('../controllers/driverController')

// localhost /driver
driverRouter.get('/', DriverController.pickUpItem )
driverRouter.get('/wait', DriverController.getWait )
driverRouter.get('/delivering', DriverController.deliver )
driverRouter.get('/arrived', DriverController.arrived )






module.exports = driverRouter