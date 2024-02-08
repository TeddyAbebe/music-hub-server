const Music = require("./index");

async function allMusic(page = 1, pageSize = 10, genre = "") {
  const skip = (page - 1) * pageSize;
  const query = genre ? { genre: { $regex: new RegExp(genre, "i") } } : {};
  const musics = await this.find(query, {
    _id: 1,
    title: 1,
    artist: 1,
    album: 1,
    genre: 1,
  })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(pageSize);

  const TotalMusics = await this.countDocuments(query);

  return {
    musics,
    TotalMusics,
  };
}

async function addToList(data) {
  const { title, artist, album, genre } = data;

  const music = new this({
    title,
    artist,
    album,
    genre,
  });

  return await music.save();
}

async function singleMusic(id) {
  return await this.findById(id);
}

async function updateMusic(id, data) {
  const { title, artist, album, genre } = data;
  const music = await this.findById(id);

  if (music) {
    music.title = title;
    music.artist = artist;
    music.album = album;
    music.genre = genre;

    return await music.save();
  } else {
    throw new Error("Music Not Found");
  }
}

async function deleteMusic(id) {
  const music = await this.findById(id);

  if (music) {
    await music.deleteOne();
  } else {
    throw new Error("Music Not Found");
  }
}

async function musicStatistics() {
  try {
    const totalSongs = await this.countDocuments();
    const totalArtists = await this.distinct("artist").countDocuments();
    const totalAlbums = await this.distinct("album").countDocuments();
    const totalGenres = await this.distinct("genre").countDocuments();

    const genresStatistics = await this.aggregate([
      {
        $group: {
          _id: "$genre",
          count: { $sum: 1 },
          musics: { $addToSet: "$title" },
        },
      },
    ]);

    const artistsStatistics = await this.aggregate([
      {
        $group: {
          _id: "$artist",
          count: { $sum: 1 },
          musics: { $addToSet: "$title" },
          albums: { $addToSet: "$album" },
        },
      },
    ]);

    const albumsStatistics = await this.aggregate([
      {
        $group: {
          _id: "$album",
          count: { $sum: 1 },
          musics: { $addToSet: "$title" },
        },
      },
    ]);

    return {
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenres,
      genresStatistics,
      artistsStatistics,
      albumsStatistics,
    };
  } catch (error) {
    console.error("Error in musicStatistics:", error);
    throw error;
  }
}

module.exports = {
  allMusic,
  addToList,
  singleMusic,
  updateMusic,
  deleteMusic,
  musicStatistics,
};
