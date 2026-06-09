-- CreateTable
CREATE TABLE "songs" (
    "id" SERIAL NOT NULL,
    "idSpotify" TEXT NOT NULL,
    "track" TEXT NOT NULL,
    "artiste" TEXT NOT NULL,
    "album" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "cover" TEXT NOT NULL,

    CONSTRAINT "songs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "songs_idSpotify_key" ON "songs"("idSpotify");
