-- CreateEnum
CREATE TYPE "GameMode" AS ENUM ('classic', 'top50fr');

-- AlterTable
ALTER TABLE "songs" ADD COLUMN     "gameMode" "GameMode";
