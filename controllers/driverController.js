const { Driver, Customer, Item, Category } = require('../models')
const transporter = require('../nodemailer')

class DriverController {
  static pickUpItem(req, res) {
    let data = {
      driver: {},
      item: {},
      customer: {}
    }
    let driverId = req.session.userId

    Driver.findByPk(driverId, {
      include: Item
    })
    .then(driver => {
      if (driver.ItemId === null) {
        res.render('drivers/wait')
      } else {
        data.driver = driver
        data.item = driver.Item
        console.log(driver)

        let customerId = driver.Item.CustomerId
        if(customerId !== null ){
          return Customer.findByPk(customerId)
        } else {
          res.redirect('/driver/wait')
        }
      }
    })
    .then(customer => {
      data.customer = customer
      res.render('drivers/pickItem', {data})
    })
    .catch(err => {
      res.send(err)
    })
  }

  static deliver(req, res) {
    let driverId = req.session.userId
    Driver.findByPk(driverId, {
      include: Item
    })
    .then(data => {
      let customerId = data.Item.CustomerId
      return Customer.findByPk(customerId)
    })
    .then(customer => {

      const option = {
            from: "sampaikanpaikan@hotmail.com",
            to: "suryaajis330@gmail.com",
            subject: "Delivering",
            text: `Hai ${customer.fullName}, your order is on the way..`
        }

      transporter.sendMail(option, (err, info) => {
          if (err) console.log(err);
          else console.log("sent: " + info.response);
      })

      res.redirect('/driver')
    })
    .catch(err => {
      res.send(err)
    })  
  }

  static arrived(req, res) {
    let driverId = req.session.userId
    let customerId 
    let itemId
    console.log(driverId)
    Driver.findByPk(driverId, {
      include: Item
    })
    .then(data => {
      itemId = data.Item.id
      customerId = data.Item.CustomerId
      return Customer.findByPk(customerId)
    })
    .then(customer => {

      const option = {
            from: "sampaikanpaikan@hotmail.com",
            to: `${customer.email}`,
            subject: "Enjoy your order!",
            text: `Hai ${customer.fullName}, your order has arrived`
        }

      transporter.sendMail(option, (err, info) => {
          if (err) console.log(err);
          else console.log("sent: " + info.response);
      })
      return Driver.update({ ItemId: null }, { where: { id: driverId } })
    })
    .then(() => {
      return Item.update({ CustomerId: null }, { where: { id: itemId }})
    })
    .then(() => {
      res.redirect('/driver/wait')
    })
    .catch(err => {
      res.send(err)
    })  
  }


  static getWait(req, res) {
    res.render('drivers/wait')
  }
}



module.exports = DriverController