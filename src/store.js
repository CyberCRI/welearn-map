import { createEvent, createEffect, createStore, createApi } from 'effector'

export const viewportEvent = {
  zoom: createEvent(),
  export: createEvent(),
  nudge: createEvent(),
  click: createEvent(),
  focusNode: createEvent(),
}

export const NodeEvents = {
  highlight: createEvent(),
  focus: createEvent(),
  clear: createEvent(),
  undo: createEvent(),
}

export const StateEvents = {
  ready: createEvent(),
}

export const nodePicker = {
  merge: createEvent(),
  reset: createEvent(),
  replace: createEvent(),
  remove: createEvent(),
}

export const didPickLayer = createEvent()

export const $layerSource = createStore({})
  .on(didPickLayer, (_, layerId) => layerId)



//- These are container stores for D3 visualisation. Specifically this contains
//- all the labels.
export const $markerStore = createStore([])

export const $markers = createApi($markerStore, {
  appendConcepts: (state, items) => {
    const nodes = items.map(n => ({ kind: 'concept', wikidata_id: n.index, ...n }))
    return _.unionBy(state, nodes, 'wikidata_id')
  },
  appendPortals: (state, items) => {
    const nodes = items.map(n => ({ kind: 'portal', ...n }))
    return _.unionBy(state, nodes, 'wikidata_id')
  },
  clear: (state) => [],
  clearConcepts: (state) => _.filter(state, ['kind', 'portal']),
})
