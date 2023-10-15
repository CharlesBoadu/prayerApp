const express = require("express");
const healthPrayers = require("../db/prayersAboutHealth");
const healthRouter = express.Router();

healthRouter.get("/all", (req, res) => {
  res.json({
    code: "PAH00",
    message: "Success",
    data: healthPrayers,
  });
});

healthRouter.get("/:id", (req, res) => {
    const id = req.params.id;
    const prayer = healthPrayers.find((prayer) => prayer.id === Number(id));
    if (prayer) {
        res.json({
        code: "PAH00",
        message: "Success",
        data: prayer,
        });
    } else {
        res.json({
        code: "PAH01",
        message: "Prayer not found",
        });
    }
    }
);

module.exports = healthRouter;
