const cache = new Map();
const TTL = 1000 * 60 * 30; // 30 min

export function setTrack(id, data) {
  cache.set(id, {
    data,
    expires: Date.now() + TTL,
  });
}

export function getTrack(id) {
  const entry = cache.get(id);

  if (!entry) return null;

  if (Date.now() > entry.expires) {
    cache.delete(id);
    return null;
  }

  return entry.data;
}

export function clearCache() {
  cache.clear();
}