import cron from "node-cron";
import prisma from "../../prismaClient.js";
import { getTop50FR } from "../spotify.js";
import { GameMode } from "@prisma/client";

cron.schedule("18 3 * * *", async () => {
  await prisma.song.updateMany({
    where: { dailyDate: { not: null }, gameMode: GameMode.top50fr },
    data: { dailyDate: null },
  });

  const tracks = await getTop50FR();
  const shuffled = tracks.sort(() => Math.random() - 0.5);

  let song = null;
  for (const track of shuffled) {
    const existing = await prisma.song.findUnique({
      where: { idSpotify: track.idSpotify },
    });

    if (!existing) {
      song = await prisma.song.create({
        data: { ...track, gameMode: GameMode.top50fr, dailyDate: new Date() },
      });
      break;
    }
  }

  if (!song) {
    console.log("Tous les tracks du Top 50 FR sont déjà en BDD");
    return;
  }

  console.log(`Top50 du jour : ${song.track} - ${song.artist}`);
});