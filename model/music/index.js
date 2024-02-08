const mongoose = require("mongoose");
const { model } = mongoose;
const musicSchema = require("./schema");
const staticsFunctions = require("./statics");

musicSchema.statics = staticsFunctions;

const Music = model("Music", musicSchema);

module.exports = Music;
