let cachedToken = null;
let tokenExpiry = null;

async function getToken() {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken;
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=client_credentials&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`,
  });
  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
  return cachedToken;
}

export async function searchTracks(query) {
  const token = await getToken();
  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=3`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.json();
}

export async function getRandomTrack() {
  const token = await getToken();
  const baseUrl = "https://api.spotify.com/v1/search";

  // random letter to resech as title of track ==> function of https://perryjanssen.medium.com/getting-random-tracks-using-the-spotify-api-61889b0c0c27
  // A list of all characters that can be chosen.
  const characters = "abcdefghijklmnopqrstuvwxyz";

  // Gets a random character from the characters string.
  const randomCharacter = characters.charAt(
    Math.floor(Math.random() * characters.length),
  );
  // console.log(encodeURIComponent(randomSearch));

  // random offset
  const randomOffset = Math.floor(Math.random() * 50);
  // console.log(randomOffset);
  // request a tracks with the name + a random offet
  const callRandomTrack = await fetch(
    `${baseUrl}?q=${encodeURIComponent(randomCharacter)}&type=track&limit=1&offset=${randomOffset}&market=FR`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  // add a fallback return
  if (!callRandomTrack.ok) {
    console.log("Spotify error:", response.status);
    return null;
  }

  // console.log(callRandomTrack);

  const data = await callRandomTrack.json();
  // sadd second fallback return
  if (!data.tracks || data.tracks.items.length === 0) {
    return null;
  }

  // console.log(data);
  return data.tracks.items[0];
}

export async function getGenreOfATrack(artistName) {
  const token = await getToken();
  const callArtistsInfos = await fetch(
    `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=${process.env.LASTFM_API_KEY}&format=json`,
  );
  // console.log(callArtistsInfos);
  const data = await callArtistsInfos.json();

  if (!data.artist || !data.artist.tags || !data.artist.tags.tag) {
    console.log("Pas de tags trouvés pour cet artiste");
    return "";
  }

  const genres = data.artist.tags.tag;
  const stringGenre = genres.map((tag) => tag.name).join(", ");

  console.log(stringGenre);

  return stringGenre;
}