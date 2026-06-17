const prisma = require('../prismaClient.js');

async function getDailyTarget() {
  return prisma.song.findFirst({
    where: { dailyDate: { not: null } }, 
    select: { track: true, artist: true, album: true, year: true, duration: true },
  });
}

module.exports = { getDailyTarget };
