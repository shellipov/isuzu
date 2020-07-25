const express = require("express");
const {
  EngineModel,
  CarcassModel,
  TransmissionModel,
  ColorModel,
  ConfigurationModel,
  СompetitorsssModel,
} = require("../DataBase/Database.js");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.render("addCompetitors");
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  await СompetitorsssModel.create({
    name: req.body.name,
    engine: req.body.engine,
    carcass: req.body.carcass,
    transmission: req.body.transmission,
    color: req.body.color,
    numberofseats: req.body.numberofseats,
    groundclearance: req.body.groundclearance,
    carrying: req.body.carrying,
    price: req.body.price,
    creator: req.session.user._id,
  });
});

router.get("/change", async (req, res) => {
  let competitors = await СompetitorsModel.find();
  res.render("changeCompetitors", { competitors });
});

router.post("/change", async (req, res) => {
  console.log(req.body);
  let competitors = await СompetitorsModel.findOne({
    name: req.body.competitors,
  });
  console.log(competitors);
  res.render("changeCompare", { competitors });
});

router.post("/changed", async (req, res) => {
  console.log(req.body);
  await СompetitorsssModel.findOneAndUpdate(
    {
      name: req.body.competitors,
    },
    {
      $set: {
        name: req.body.name,
        engine: req.body.engine,
        carcass: req.body.carcass,
        transmission: req.body.transmission,
        color: req.body.color,
        numberofseats: req.body.numberofseats,
        groundclearance: req.body.groundclearance,
        carrying: req.body.carrying,
        price: req.body.price,
      },
    }
  );
  res.redirect("/admin");
});

router.get("/delete", async (req, res) => {
  let competitors = await СompetitorsssModel.find();
  res.render("deleteCompetitors", { competitors });
});

router.post("/delete", async (req, res) => {
  await СompetitorsssModel.findOneAndDelete({ name: req.body.competitors });
  res.redirect("/admin");
});

module.exports = router;
