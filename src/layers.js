const trimLabel = (label) => {
  // If the label has >= 6 words, we'd add '...'.
  // Split the label text on space characters (\s)
  const words = label.split(/\s/)
  if (words.length >= 6) {
    return [...words.slice(0, 5), '...'].join(' ')
  }
  return label
}

const takeValues = (concept, lang) => {
  if (!concept[`title_${lang}`]) {
    return null
  }

  return {
    label: trimLabel(concept[`title_${lang}`]),
    lang,
    title: concept[`title_${lang}`],
  }
}

export const request = async () => {
  const r = await fetch('https://welearn.cri-paris.org/api/resources/bot/projects@import.bot?limit=600&skip=0', {
    method: 'get',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  })
  return await r.json()
}

export const fetchBaseLayer = (nodes) => {
  return nodes.concepts.map(p => {
    return {
      x: p.x_map_en,
      y: p.y_map_en,
      canPick: true,
      userData: true,
      ...(takeValues(p, 'en') || takeValues(p, 'fr')),
      elevation: .8,
      markerShape: 'circle',
      markerSize: 4,
      labelOpacity: 1,
      labelPriority: (p.n_items || 1),
      cuid: p.cuid
    }
  }).filter(p => p.x && p.y);
};

export const fetchSelectionPoints = (points, resources) => {
  const concepts = Array.from(new Set(points.map((c) => c.cuid)));
  let matchingResources = []
  resources.forEach(resource => {
    resource.concepts.forEach(concept => {
      if(concepts.includes(concept.cuid)) {
        matchingResources.push(resource);
      }
    })
  });
  return matchingResources.filter((x, i, a) => a.indexOf(x) === i);
}