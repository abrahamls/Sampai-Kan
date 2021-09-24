function isLoginCustomer(req, res, next) {
  if(req.session.role === 'Customer') {
    console.log('Kamu Customer, silahkan membeli')
    next()
  } else {
    console.log('Bukan Customer, coba registrasi dlu')
    res.render('home')
  }
}

module.exports = isLoginCustomer