import { Router } from "express";
import { searchTracks } from "../services/spotify.js";

const router = Router();

router.get("/", async (req, res) => {
  const { q } = req.query;
  if (!q || q.length < 2) return res.json([]);

  const data = await searchTracks(q);
  const tracks = data.tracks.items.map((track) => ({
    id: track.id,
    track: track.name,
    artist: track.artists.map((a) => a.name).join(", "),
    album: track.album.name,
    year: track.album.release_date.slice(0, 4),
    duration: Math.floor(track.duration_ms / 1000),
    popularity: track.popularity,
    cover: track.album.images[2]?.url,
    preview_url: track.preview_url,
  }));

  res.json(tracks);
});

export default router;
