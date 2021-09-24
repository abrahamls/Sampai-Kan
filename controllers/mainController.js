const {Item, Category} = require('../models')
const formatPrice = require('../helpers/formatPrice')

class MainController {
  static getHome(req, res) {
    res.render('home')
  }

  // static getListItems(req, res) {
  //   Item.findAll({ include: [Category] })
  //   .then(items => {
  //     res.render('listItems', { data: items, formatPrice })
  //   })
  // }
  
}


module.exports = MainController