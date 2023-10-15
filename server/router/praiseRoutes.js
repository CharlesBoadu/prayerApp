const praisePrayers = require("../db/prayersForPraise");
const praiseRouter = require("express").Router();

praiseRouter.get("/all", (req, res) => {
  res.json({
    code: "PAP00",
    message: "Success",
    data: praisePrayers,
  });
});

praiseRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const prayer = praisePrayers.find((prayer) => prayer.id === Number(id));
  if (prayer) {
    res.json({
      code: "PAP00",
      message: "Success",
      data: prayer,
    });
  } else {
    res.json({
      code: "PAP01",
      message: "Prayer not found",
    });
  }
});

module.exports = praiseRouter;
