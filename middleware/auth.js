function sessionChecker(req, res, next) {
  if (!req.session.user) {
    console.log('checker if');
    res.redirect('/')
  }
  else {
    console.log('checker else');
    next()
  }
}

function cookieCleaner(req, res, next) {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid')
  }
  next()
}

module.exports = { sessionChecker, cookieCleaner }
