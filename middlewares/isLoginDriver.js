function isLoginDriver(req, res, next) {
  if(req.session.role === 'Driver') {
    console.log('Silahkan masuk para driver')
    next()
  } else {
    console.log('Kamu bukan driver!!')
    res.render('home')
  }
}

module.exports = isLoginDriver