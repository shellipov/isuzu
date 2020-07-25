const express = require("express");
const { СompetitorsModel } = require("../DataBase/Database.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("./configurator");
});

router.post("/", async (req, res) => {
  console.log("nhfnhfnfhf")
  try {
    const competitors = await СompetitorsModel.find();

    competitors.sort(function (a, b) {
      if (a.price > b.price) {
        return 1;
      }
      if (a.price < b.price) {
        return -1;
      }
      return 0;
    });

    let index = 1;
    while (competitors[index].price < req.body.price) {
      index += 1;
    }

    const firstCompetitor = {
      name: competitors[index].name,
      engine: competitors[index].engine.name,
      transmission: competitors[index].transmission.name,
      carcass: competitors[index].carcass.name,
      color: "Белый",
      price: competitors[index].price,
    };

    const secondCompetitor = {
      name: competitors[index - 1].name,
      engine: competitors[index - 1].engine.name,
      transmission: competitors[index - 1].transmission.name,
      carcass: competitors[index - 1].carcass.name,
      color: "Белый",
      price: competitors[index - 1].price,
    };
    let compet = [secondCompetitor, req.body, firstCompetitor];
    res.render("compare", { compet });
  } catch (error) {}
});

module.exports = router;
