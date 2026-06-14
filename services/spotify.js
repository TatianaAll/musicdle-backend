let cachedToken = null;
let tokenExpiry = null;

async function getToken() {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken;
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=client_credentials&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`
  });
  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
  return cachedToken;
}

export async function searchTracks(query) {
  const token = await getToken();
  const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=6`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

async function getUserToken() {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64'),
    },
    body: `grant_type=refresh_token&refresh_token=${process.env.SPOTIFY_REFRESH_TOKEN}`,
  });
  const data = await res.json();
  return data.access_token;
}


//top 50 FR
export async function getTop50FR() {
  const token = await getUserToken();
  const res = await fetch(
    "https://api.spotify.com/v1/playlists/37i9dQZEVXbIPWwFssbupI/items",
    { method: "PUT",
      headers: { Authorization: `Bearer ${token}` } }
  );
  const text = await res.text();
  console.log("getTop50FR response:", text); // ←
  const data = JSON.parse(text);

  return data.items.map(({ track }) => ({
    idSpotify: track.id,
    track: track.name,
    artist: track.artists[0].name,
    album: track.album.name,
    year: track.album.release_date.split("-")[0],
    duration: Math.floor(track.duration_ms / 1000),
    cover: track.album.images[0]?.url ?? "",
  }));
}