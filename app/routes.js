const express = require("express");
const router = express.Router();
const musicRoutes = require("../routes/musicRoutes");

router.use("/music", musicRoutes);

module.exports = router;
