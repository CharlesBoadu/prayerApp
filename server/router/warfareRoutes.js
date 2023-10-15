const warfarePrayers = require("../db/warfarePrayers");
const warfareRouter = require("express").Router();

warfareRouter.get("/all", (req, res) => {
  res.json({
    code: "PAW00",
    message: "Success",
    data: warfarePrayers,
  });
});

warfareRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const prayer = warfarePrayers.find((prayer) => prayer.id === Number(id));
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

module.exports = warfareRouter;
