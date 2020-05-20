const PREF_LANG = 'en'

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
  const nodeLUT = []
  let repr, dot
  for (let node of nodes.concepts) {
    repr = node.representations.find((repr) => repr.lang === PREF_LANG)
    
    if (repr) {
      dot = {
        ...node,
        elevation: .8,
        markerShape: 4,
        labelOpacity: 1,
        labelPriority: Math.max(node.n_items, 1),
        canPick: true
      }

      nodeLUT.push({
        ...repr,
        ...dot,
        label: trimLabel(repr.title),
      })
    }
  }

  return nodeLUT
}

export const fetchSelectionPoints = (points, resources) => {
  const concepts = Array.from(new Set(points.map((c) => c.wikidata_id)));
  let matchingResources = []
  resources.forEach(resource => {
    resource.concepts.forEach(concept => {
      if(concepts.includes(concept.wikidata_id)) {
        matchingResources.push(concept.wikidata_id);
      }
    })
  });
  return matchingResources.filter((x, i, a) => a.indexOf(x) === i);
}