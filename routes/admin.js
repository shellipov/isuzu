const express = require('express');
const router = express.Router();
const { sessionChecker } = require('../middleware/auth.js');
const { AdminsModel } = require('../DataBase/Database.js');



router.get('/', sessionChecker, (req, res) => {
  // console.log(req.session.user)
  res.render('admin', { superadmin: req.session.user.superadmin })
  
})

router.get('/add', sessionChecker, (req, res) => {
  res.render('addAdmin')
})

router.post('/add', sessionChecker, async (req, res) => {
  const newAdmin = req.body;
  const { name, login, password, position, superadmin } = newAdmin;
  const findAdmin = await AdminsModel.findOne({ login });
  if (!findAdmin) {
    const findAdmin = await AdminsModel.create({ name, login, password, position, superadmin });
    res.redirect('/success')
  } else {
    const error = 'Такой логин уже существует';
    const path = '/admin/add'
    res.render('error', { error, path })
  }
})

router.get('/delete', sessionChecker, async (req, res) => {
const users = await AdminsModel.find()
  res.render('deleteUser', {users})
})

router.post('/delete', sessionChecker, async (req, res) => {
const user = req.body;
const needUser = await AdminsModel.findOneAndRemove({login:user.user})

  res.redirect('/success')
})


// router.post('/', sessionChecker, (req, res) => {

//   res.render('admin')
// })

module.exports = router;
