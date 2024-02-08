const mongoose = require("mongoose");
const { Schema } = mongoose;

const musicSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, default: "Unknown Album" },
  genre: { type: String, default: "Unknown Genre" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = musicSchema;
