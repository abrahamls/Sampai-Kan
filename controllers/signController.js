const {Driver, Customer, Item, Category} = require('../models/index')
const { Op } = require('sequelize')
var bcrypt = require('bcryptjs');

class SignController {
  static getRegister(req, res) {
    let err = undefined
    res.render('registerForm', {err})
  }

  static postRegister(req, res) {
    const {fullName, email, password, address, phone, role} = req.body
    let newUser = {
      fullName,
      email,
      address,
      phone,
      password
    }

    if( role === 'Customer') {
      Customer.create(newUser)
      .then(data => {
        res.redirect('/login')
      })
      .catch(err => {
        console.log(err)
        err = err.errors.map(el => el.message )
        res.render('registerForm', {err})
      })
    } else if (role === 'Driver') {
      Driver.create(newUser)
      .then(data => {
        res.redirect('/login')
      })
      .catch(err => {
        err = err.errors.map(el => el.message )
        res.render('registerForm', {err})
      })
    } else {
      let err = 'Role kosong, pilih salah satu'
      res.render('registerForm', {err})
    }
  }


  static getLogin(req, res) {
    let invalid = req.query.error
    res.render('loginForm', {invalid})
  }

  static postLogin(req, res) {
    const {email, password, role} = req.body
    let error = 'Invalid username/password'
    let model;

    if(role === 'Customer') {
      model = Customer
    } else if ( role === 'Driver') {
      model = Driver
    } else {
      req.session.isLogin = false
      res.redirect(`/login?error=${error}`)
    }

    model.findOne({
      where: {email}
    })
    .then(data => {
      // console.log(data)
      if(data) {
        let check = bcrypt.compareSync(password, data.password)

        if(check) {
          req.session.userId = data.id
          req.session.email = email
          req.session.isLogin = true
          req.session.role = role
          if(role === 'Customer' ) {
            res.redirect('/customer')
          } else {
            res.redirect('/driver')
          }
        } else {
          req.session.isLogin = false 
          res.redirect(`/login?error=${error}`)
        }
      
      } else if (data === null) {
        req.session.isLogin = false
        res.redirect(`/login?error=${error}`)
      }
    })
    .catch(err => {
      console.log(err)
      res.send(err)
    })

  }


  static getLogout(req, res) {
    req.session.destroy()
    res.redirect('/login')
  }
}


module.exports = SignController