const express = require("express");
const wealthPrayers = require("../db/prayersAboutWealth");
const wealthRouter = express.Router();

wealthRouter.get("/all", (req, res) => {
  res.json({
    code: "PAW00",
    message: "Success",
    data: wealthPrayers,
  });
});

wealthRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const prayer = wealthPrayers.find((prayer) => prayer.id === Number(id));
  if (prayer) {
    res.json({
      code: "PAW00",
      message: "Success",
      data: prayer,
    });
  } else {
    res.json({
      code: "PAW01",
      message: "Prayer not found",
    });
  }
});

wealthRouter.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * wealthPrayers.length);
  console.log("HEllo", randomIndex);
  res.json({
    code: "PAW00",
    message: "Success",
    data: wealthPrayers[randomIndex],
  });
});

module.exports = wealthRouter;
