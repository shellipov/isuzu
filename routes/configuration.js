const express = require("express");
const {
  EngineModel,
  CarcassModel,
  TransmissionModel,
  ColorModel,
  ConfigurationModel,
} = require("../DataBase/Database.js");
const { sessionChecker } = require("../middleware/auth.js");

const router = express.Router();

router.get("/add", sessionChecker, async function (req, res) {
  try {
    const engine = await EngineModel.find();
    const carcass = await CarcassModel.find();
    const transmission = await TransmissionModel.find();
    const color = await ColorModel.find();
    const data = { engine, carcass, transmission, color };

    res.render("addConfiguration", data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/add", sessionChecker, async function (req, res) {
  const config = req.body;
  const engine = await EngineModel.findOne({name:config.engine});
  const carcass = await CarcassModel.findOne({name:config.carcass});
  const transmission = await TransmissionModel.findOne({name:config.transmission});
  const color = await ColorModel.findOne({name:config.color});

  await ConfigurationModel.create({ 
    name: config.name, 
    engine, 
    carcass, 
    transmission, 
    color, 
    flag: config.flag, 
    numberofseats: config.numberofseats, 
    groundclearance: config.groundclearance, 
    carrying: config.carrying, 
    price: config.price, 
    creator: req.session.user._id, })
  res.redirect('/success');
});

router.get("/change", sessionChecker, async function (req, res) {
  try {
    const configurations = await ConfigurationModel.find();
    res.render("chooseConfiguration", {configurations});
  } catch (error) {
    console.log(error);
  }
});

router.post("/change", sessionChecker, async function (req, res) {
  const reqconfig = req.body;
  const configuration = await ConfigurationModel.findOne({name:reqconfig.name});
  const engine = await EngineModel.find();
  const carcass = await CarcassModel.find();
  const transmission = await TransmissionModel.find();
  const color = await ColorModel.find();
  const data = { engine, carcass, transmission, color, configuration };
  res.render('changeConfiguration', {data} )
});

router.post("/changeparams", sessionChecker, async function (req, res) {
  const config = req.body;

  const {name,
  flag,
  numberofseats,
  groundclearance,
  carrying,
  price,} = config

  const engine = await EngineModel.findOne({name:config.engine});
  const carcass = await CarcassModel.findOne({name:config.carcass});
  const transmission = await TransmissionModel.findOne({name:config.transmission});
  const color = await ColorModel.findOne({name:config.color});

  await ConfigurationModel.findOneAndUpdate({name},{$set:{engine,carcass,transmission,color,flag,numberofseats,groundclearance,carrying,price,}})

  res.redirect('/success');
});


router.get("/del", sessionChecker, async function (req, res) {
  try {
    const configurations = await ConfigurationModel.find();
    res.render("deleteConfiguration", {configurations});
  } catch (error) {
    console.log(error);
  }
});

router.post("/del", sessionChecker, async function (req, res) {
  console.log(req.body.name)
   const config = await ConfigurationModel.deleteOne({name:req.body.name})
    res.redirect('/success');
});

module.exports = router;

