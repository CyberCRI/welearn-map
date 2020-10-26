import { createEvent, createEffect, createStore } from 'effector'

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
