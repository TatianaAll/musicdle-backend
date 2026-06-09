/*
  Warnings:

  - You are about to drop the column `artiste` on the `songs` table. All the data in the column will be lost.
  - Added the required column `artist` to the `songs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "songs" DROP COLUMN "artiste",
ADD COLUMN     "artist" TEXT NOT NULL;
