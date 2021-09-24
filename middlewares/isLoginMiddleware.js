function isLoginMiddleware(req, res, next) {
  if ( req.session.isLogin ){
    console.log('Login benar, lihat data', req.session)
    next()
  } else {
    console.log('Login salah!!')
    res.render('home')
  }
}


module.exports = isLoginMiddleware