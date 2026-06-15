import cron from "node-cron";
import prisma from "../../prismaClient.js";

// Define the hoir for the cron daily classic games
cron.schedule("0 0 * * *", async () => {
  await prisma.song.updateMany({
    where: { dailyDate: { not: null } },
    data: { dailyDate: null },
  });

  const count = await prisma.song.count();
  const skip = Math.floor(Math.random() * count);
  const song = await prisma.song.findFirst({ skip });

  await prisma.song.update({
    where: { id: song.id },
    data: { dailyDate: new Date() },
  });

  console.log(`Chanson du jour : ${song.track} - ${song.artist}`);
});