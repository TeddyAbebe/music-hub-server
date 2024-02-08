const Music = require("../model/music");

// Get all Musics
const getAllMusicController = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const genre = req.query.genre || "";

  try {
    const allMusics = await Music.allMusic(page, pageSize, genre);
    res.json(allMusics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new music
const addMusicController = async (req, res) => {
  const data = req.body;

  try {
    const newMusic = await Music.addToList(data);
    res.status(201).json(newMusic);
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message || "Failed to create music entry." });
  }
};

// Getting a single music
const getSingleMusicController = async (req, res) => {
  const { id } = req.params;

  try {
    const music = await Music.singleMusic(id);

    if (music) {
      res.json(music);
    } else {
      res.status(404).json({ message: "Music Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a music
const updateMusicController = async (req, res) => {
  const musicId = req.params.id;
  const data = req.body;

  try {
    const updatedMusic = await Music.updateMusic(musicId, data);
    res.json(updatedMusic);
  } catch (error) {
    if (error.message === "Music Not Found") {
      res.status(404).json({ message: "Music Not Found" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// Remove Music
const removeMusicController = async (req, res) => {
  const musicId = req.params.id;

  try {
    await Music.deleteMusic(musicId);
    res.json({ message: "Music Deleted Successfully" });
  } catch (error) {
    if (error.message === "Music Not Found") {
      res.status(404).json({ message: "Music Not Found" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// Generate overall statistics
const generateStatisticsController = async (req, res) => {
  try {
    const statistics = await Music.musicStatistics();
    res.json(statistics);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllMusicController,
  addMusicController,
  getSingleMusicController,
  updateMusicController,
  removeMusicController,
  generateStatisticsController,
};
