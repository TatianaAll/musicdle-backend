import prisma from "../prismaClient.js";

export async function getDailyTarget() {
  return prisma.song.findFirst({
    orderBy: { id: "desc" }, 
    select: { track: true, artist: true, album: true, year: true, duration: true },
  });
}