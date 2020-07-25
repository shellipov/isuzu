const express = require("express");
const {
  EngineModel,
  CarcassModel,
  TransmissionModel,
  ColorModel,
  ConfigurationModel,
} = require("../DataBase/Database.js");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.render("addVariantOpt");
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = {};
    console.log(data.engine);
    res.render("addVariantOpt");
  } catch (error) {
    console.log(error);
  }
});

router.post("/add", async (req, res) => {
  console.log(req.body);
  const engine = await EngineModel.find();
  const carcass = await CarcassModel.find();
  const transmission = await TransmissionModel.find();
  const color = await ColorModel.find();
  const configuration = await ConfigurationModel.find();
  switch (req.body.options) {
    case "carcass":
      res.render("addNewVariantOptions", { carcass });
      break;

    case "color":
      res.render("addNewVariantOptions", { color });
      break;

    case "engine":
      res.render("addNewVariantOptions", { engine });
      break;

    case "transmission":
      res.render("addNewVariantOptions", { transmission });
      break;

    default:
      break;
  }
});

router.post("/addoptions", async (req, res) => {
  console.log(req.body);
  if (req.body.color) {
    await ColorModel.create({
      name: req.body.color,
      creator: req.session.user._id,
    });
  }
  if (req.body.engineName) {
    await EngineModel.create({
      name: req.body.engineName,
      volume: req.body.engineVolume,
      enginePistons: req.body.engineCount,
      power: req.body.enginePower,
      type: req.body.engineType,
      creator: req.session.user._id,
    });
  }
  if (req.body.carcassName) {
    await CarcassModel.create({
      name: req.body.carcassName,
      type: req.body.carcassType,
      creator: req.session.user._id,
    });
  }
  if (req.body.transName) {
    await TransmissionModel.create({
      name: req.body.transName,
      type: req.body.transType,
      gearstages: req.body.transCount,
      creator: req.session.user._id,
    });
  }
  res.redirect("/admin");
});

router.get("/ch", (req, res) => {
  res.render("changeVariantOpt");
});

router.post("/ch", async (req, res) => {
  console.log(req.body);
  const engine = await EngineModel.find();
  const carcass = await CarcassModel.find();
  const transmission = await TransmissionModel.find();
  const color = await ColorModel.find();
  const configuration = await ConfigurationModel.find();
  switch (req.body.options) {
    case "carcass":
      res.render("changeOptions", { carcass });
      break;

    case "color":
      res.render("changeOptions", { color });
      break;

    case "engine":
      res.render("changeOptions", { engine });
      break;

    case "transmission":
      res.render("changeOptions", { transmission });
      break;

    default:
      break;
  }
});

router.post("/changeoptions", async (req, res) => {
  console.log(req.body);
  if (req.body.color) {
    await ColorModel.findOneAndUpdate(
      { name: req.body.colorOld },
      {
        $set: {
          name: req.body.color,
          urlimage: req.body.urlImage,
          creator: req.session.user._id,
          updated_at: Date.now(),
        },
      }
    );
  }
  if (req.body.engineName) {
    await EngineModel.findOneAndUpdate(
      { name: req.body.engineOldName },
      {
        $set: {
          name: req.body.engineName,
          volume: req.body.engineVolume,
          enginePistons: req.body.engineCount,
          power: req.body.enginePower,
          type: req.body.engineType,
          creator: req.session.user._id,
          updated_at: Date.now(),
        },
      }
    );
  }
  if (req.body.carcassName) {
    await CarcassModel.findOneAndUpdate(
      { name: req.body.carcassOldName },
      {
        $set: {
          name: req.body.carcassName,
          type: req.body.carcassType,
          creator: req.session.user._id,
          updated_at: Date.now(),
        },
      }
    );
  }
  if (req.body.transName) {
    await TransmissionModel.findOneAndUpdate(
      { name: req.body.transOldName },
      {
        $set: {
          name: req.body.transName,
          type: req.body.transType,
          gearstages: req.body.transCount,
          creator: req.session.user._id,
          updated_at: Date.now(),
        },
      }
    );
  }
  res.redirect("/admin");
});

router.get("/del", (req, res) => {
  res.render("deleteVariantOpt");
});

router.post("/del", async (req, res) => {
  console.log(req.body);
  const engine = await EngineModel.find();
  const carcass = await CarcassModel.find();
  const transmission = await TransmissionModel.find();
  const color = await ColorModel.find();
  const configuration = await ConfigurationModel.find();
  switch (req.body.options) {
    case "carcass":
      res.render("deleteOptions", { carcass });
      break;

    case "color":
      res.render("deleteOptions", { color });
      break;

    case "engine":
      res.render("deleteOptions", { engine });
      break;

    case "transmission":
      res.render("deleteOptions", { transmission });
      break;

    default:
      break;
  }
});

router.post("/deleteoptions", async (req, res) => {
  console.log(req.body);
  if (req.body.color) {
    await ColorModel.deleteOne({ name: req.body.colorOld });
  }
  if (req.body.engineName) {
    await EngineModel.deleteOne({ name: req.body.engineOldName });
  }
  if (req.body.carcassName) {
    await CarcassModel.deleteOne({ name: req.body.carcassOldName });
  }
  if (req.body.transName) {
    await TransmissionModel.deleteOne({ name: req.body.transOldName });
  }
  res.redirect("/admin");
});

module.exports = router;
