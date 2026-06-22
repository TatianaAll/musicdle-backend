const cron = require('node-cron');
const prisma = require('../../prismaClient.js');
const { getRandomTrack, getGenreOfATrack } = require('../spotify.js');

cron.schedule("0 0 * * *", async () => {
  await prisma.song.updateMany({
    where: { dailyDate: { not: null } },
    data: { dailyDate: null },
  });

  const song = await getRandomTrack();
  if (!song) {
    console.warn("Aucun morceau Spotify disponible pour le daily song.");
    return;
  }

  const artistName = song.artists?.[0]?.name ?? "Unknown";
  const genres = await getGenreOfATrack(artistName);
  console.log(genres);

  await prisma.song.create({
    data: {
      idSpotify: song.id,
      track: song.name,
      artist: song.artists.map((a) => a.name).join(", "),
      album: song.album.name,
      year: song.album.release_date?.slice(0, 4) ?? "",
      duration: Math.floor(song.duration_ms / 1000),
      cover: song.album.images[2]?.url ?? "",
      genre: genres,
      dailyDate: new Date(),
      gameMode: "classic",
    },
  });

  console.log(`Chanson du jour : ${song.name} - ${artistName}`);
});