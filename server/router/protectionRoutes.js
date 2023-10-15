const protectionPrayers = require("../db/prayersForProtection");
const protectionRouter = require("express").Router();

protectionRouter.get("/all", (req, res) => {
  res.json({
    code: "PAP00",
    message: "Success",
    data: protectionPrayers,
  });
});

protectionRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const prayer = protectionPrayers.find((prayer) => prayer.id === Number(id));
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

module.exports = protectionRouter;
