import prisma from "../prismaClient.js";

export async function getDailyTarget() {
  return prisma.song.findFirst({
    where: { dailyDate: { not: null } }, 
    select: { track: true, artist: true, album: true, year: true, duration: true },
  });
}