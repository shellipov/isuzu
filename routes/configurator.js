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

router.get("/", async function (req, res) {
  try {
    const engine = await EngineModel.find();
    const carcass = await CarcassModel.find();
    const transmission = await TransmissionModel.find();
    const color = await ColorModel.find();
    const configuration = await ConfigurationModel.find({ flag: true });    
    const data = { engine, carcass, transmission, color, configuration };    
    res.render("configurator", data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/getSum", async function (req, res) {
  try {
    let RegularExp = new RegExp(req.body.name, "gi")    
    const configuration = await ConfigurationModel.find({
      'name': RegularExp,
      "engine.name": req.body.engine,
      "carcass.name": req.body.carcass,
      'transmission.name': req.body.transmission,
    });
    
    console.log(configuration);
    if(!configuration.price) {

    }    
    const searchColor = await ColorModel.find({name: req.body.color})    
    res.json({ price: configuration[0].price, image: searchColor[0].urlimage });
  } catch (error) {
    res.json({ error: "Такой комплектации не существует" });
  }
});


module.exports = router;
