const express = require("express");
const router = express.Router();
const {
  getAllMusicController,
  addMusicController,
  getSingleMusicController,
  updateMusicController,
  removeMusicController,
  generateStatisticsController,
} = require("../controllers/musicController");

// Route for Getting All Musics
router.get("/", getAllMusicController);

// Route for overall Statistics
router.get("/stats", generateStatisticsController);

// Route for Adding New Music
router.post("/add", addMusicController);

// Route for Getting Single Music
router.get("/:id", getSingleMusicController);

// Route for Updating Single Music
router.put("/:id", updateMusicController);

// Route for Deleting a Single Music
router.delete("/:id", removeMusicController);

module.exports = router;
