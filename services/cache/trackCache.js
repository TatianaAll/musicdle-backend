const cache = new Map();
const TTL = 1000 * 60 * 30; // 30 min

function setTrack(id, data) {
  cache.set(id, {
    data,
    expires: Date.now() + TTL,
  });
}

function getTrack(id) {
  const entry = cache.get(id);

  if (!entry) return null;

  if (Date.now() > entry.expires) {
    cache.delete(id);
    return null;
  }

  return entry.data;
}

function clearCache() {
  cache.clear();
}

module.exports = { setTrack, getTrack, clearCache };