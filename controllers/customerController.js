const { Item, Category, Driver, Customer } = require('../models')
const formatPrice = require('../helpers/formatPrice')
const { Op } = require('sequelize')


class CustomerController {
  static getListItems(req, res) {
    const { search } = req.query
    
    Item.getAll(Category, search)
    .then(items => {
        res.render('customers/listItems', { data: items, formatPrice })
    })
  }

  static buyItem(req, res) {
    let driverContact = {
        fullName: '',
        phone: '',
        url: ''
    }
    Item.update({ CustomerId: req.session.userId }, {
        where: { id: req.params.itemId }
      })
      .then(() => {
        return Driver.findOne({ where: { ItemId: null } })
      })
      .then(driver => {
        if (!driver) {
            // let err = 'No courier is available for now, please try again later'
          res.redirect(`/customer`)
        } else {
          driverContact.fullName = driver.fullName
          driverContact.phone = driver.phone
          driverContact.url = driver.profileUrl
          return Driver.update(
              { ItemId: req.params.itemId },
              { where: { id: driver.id } }
          )
        }
      })
      .then(driver => {
        console.log(driverContact, req.session.userId);
        res.render('customers/finishBuy', { driverContact, userId: req.session.userId })
      })
      .catch(err => {
        console.log(err);
      })
    }

  static profile(req, res) {
  // console.log(req.session.userId);
    Customer.findByPk(req.session.userId, { include: [Item] })
    .then(customer => {
      res.render('customers/customerProfile', { customer })
    })  
  }

  static postProfile(req, res) {
    const {fullName, email, phone, address, password} = req.body
    let newUpdate = {
      fullName,
      email,
      phone,
      address,
      password
    } 

    Customer.update(newUpdate, {
      where: { id: req.session.userId}
    })
    .then(() => {
      res.redirect('/customer/profile')
    })
    .catch(err => {
      res.send(err)
    })

  }
}

module.exports = CustomerController