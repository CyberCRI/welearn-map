import { MapLayerAPI } from '@ilearn/modules/api'


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

const nodeMapper = p => {
  ...p,
  x: p.x_map_en,
  y: p.y_map_en,
  userData: true,
  ...(takeValues(p, 'en') || takeValues(p, 'fr')),
  elevation: .8,
  markerShape: 'circle',
  markerSize: 4,
  labelOpacity: 1,
  labelPriority: (p.n_items || 1),
}

const nodeFilter = p => p.x && p.y

export const fetchBaseLayer = async () =>
  fetch(`${env.api_root}/api/resources/map/base`, {
    method: 'get',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  }).then(r => r.json())
    .then(nodes => nodes.map(nodeMapper).filter(nodeFilter))
