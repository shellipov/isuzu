const express = require('express');
const { ConfigurationModel, AdminsModel } = require('../DataBase/Database.js');
// const{sessionChecker} = require('../middleware/auth.js')
const session = require("express-session");



const router = express.Router();

router.get('/', async function (req, res) {
  const homeConfig = await ConfigurationModel.find({ flag: true });
  res.render('main', { homeConfig });
})

router.get('/login', function (req, res) {
  if (req.session.user) {
    res.redirect('/admin')
  } else {
    res.render('login');
  }
})

router.post('/login', async function (req, res) {
  const user = req.body;
  const trueAdmin = await AdminsModel.find();
  const needAdmin = trueAdmin.filter(adm => adm.login == user.username);
  if(needAdmin[0]){
    if (user.username === needAdmin[0].login && user.password === needAdmin[0].password) {
      // console.log('Вы авторизованы');
      console.log(needAdmin[0])
      req.session.user = needAdmin[0];
      res.redirect('/admin');
  }
  } else {
    const error = 'Неверный пароль';
    const path = '/login';
    res.render('error', { error , path});
  }
})

router.get('/logout', async (req, res) => {
  if (req.session.user) {
    try {
      await req.session.destroy();
      res.clearCookie("user_sid");
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  } else {
    res.redirect("/login");
  }
})

router.get('/success', (req, res) => {
  res.render('success')
})

module.exports = router;

