import { Router } from 'express';
import { searchTracks } from '../services/spotify.js';


const router = Router();

router.get('/auth', async (req, res) => {
  const { q } = req.query;
  if (!q || q.length < 2) return res.json([]);

  const data = await searchTracks(q);
  const tracks = data.tracks.items.map(t => ({
    id: t.id,
    track: t.name,
    artist: t.artists.map(a => a.name).join(', '),
    album: t.album.name,
    year: t.album.release_date.slice(0, 4),
    cover: t.album.images[2]?.url,
    preview_url: t.preview_url
  }));

  res.json(tracks);
});

export default router;