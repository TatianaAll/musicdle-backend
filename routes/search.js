const { Router } = require("express");
const { searchTracks } = require("../services/spotify.js");
const { setTrack } = require("../services/cache/trackCache.js");

const router = Router();

router.get("/", async (req, res) => {
  const q = String(req.query.q || "").trim();
  if (q.length < 2) return res.json([]);

  try {
    const spotifyData = await searchTracks(q);
    const items = spotifyData?.tracks?.items ?? [];

    const tracks = items.map((track) => {
      const formatted = {
        id: track.id,
        track: track.name,
        artist: track.artists.map((a) => a.name).join(", "),
        album: track.album.name,
        year: track.album.release_date.slice(0, 4),
        duration: Math.floor(track.duration_ms / 1000),
        popularity: track.popularity,
        cover: track.album.images[2]?.url,
        preview_url: track.preview_url,
      };

      // Cache the track data for submit
      setTrack(formatted.id, formatted);

      return formatted;
    });

    return res.json(tracks);
  } catch (error) {
    console.error("Search route failed:", error);
    return res.status(500).json({ error: "Search unavailable" });
  }
});

module.exports = router;