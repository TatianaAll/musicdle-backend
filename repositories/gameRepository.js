import prisma from "../prismaClient.js";

export async function getDailyTarget() {
  return prisma.song.findFirst({
    where: { dailyDate: { not: null } }, 
    select: { track: true, artist: true, album: true, year: true, duration: true },
  });
}

export async function getDailyGenre(req, res) {
  try {
    const song = await prisma.song.findFirst({
      where: { dailyDate: { not: null }, gameMode: "classic" },
      select: { genre: true },
    });

    res.json(song);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}