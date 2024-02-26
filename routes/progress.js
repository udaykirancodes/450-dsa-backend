const express = require("express");
const router = express.Router();

// Models
const Progress = require("../models/progress.model");

router.post("/", async (req, res) => {
  const p = new Progress({
    userid: "65dc2da459a6aa9b75f7fabb",
  });
  const r = await p.save();
  return res.json(r);
});

module.exports = router;
