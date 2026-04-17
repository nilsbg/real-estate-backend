let cache = {
  listings: [],
  lastUpdated: null,
  knownLinks: new Set()
};

export function setCache(data) {
  const newListings = data.map(item => {
    return {
      ...item,
      isNew: !cache.knownLinks.has(item.link)
    };
  });

  const updatedLinks = new Set([
    ...cache.knownLinks,
    ...data.map(item => item.link)
  ]);

  cache = {
    listings: newListings,
    lastUpdated: new Date(),
    knownLinks: updatedLinks
  };
}

export function getCache() {
  return cache;
}