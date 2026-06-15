import cron from "node-cron";
import prisma from "../../prismaClient.js";
import { getRandomTrack } from "../spotify.js";

// Define the hoir for the cron daily classic games
cron.schedule("23 12 * * *", async () => {
  await prisma.song.updateMany({
    where: { dailyDate: { not: null } },
    data: { dailyDate: null },
  });

  const song = await getRandomTrack();
  // const randomArtistName = song.artists[0].name;
  console.log(song);
  // let artistGenres = [];
  // const artistsInfos = await getGenreOfATrack(randomArtistId);
  // console.log(getGenreOfATrack(randomArtistName));

  await prisma.song.create({
    data: {
      idSpotify: song.id,
      track: song.name,
      artist: song.artists.map((a) => a.name).join(", "),
      album: song.album.name,
      year: song.album.release_date.slice(0, 4),
      duration: Math.floor(song.duration_ms / 1000),
      cover: song.album.images[2]?.url,
      dailyDate: new Date(),
      gameMode: "classic",
    },
  });

  console.log(`Chanson du jour : ${song.track} - ${song.artist}`);
});
