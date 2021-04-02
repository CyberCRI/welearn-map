/* eslint no-multi-spaces: 0 */

// Keyboard shortcuts and their aliases for interacting with map. We would
// pause the event handlers if map layer isn't focused, since otherwise it'd
// break viewport scrolling and navigation.
export const KeyBinding = {
  panning: {
    left:   ['left', 'a', 'h'],
    right:  ['right', 'd', 'l'],
    up:     ['up', 'w', 'k'],
    down:   ['down', 's', 'j'],
  },
  zooming: {
    plus:   ['shift+up', '+', '='],
    minus:  ['shift+down', '-'],
  },
  control: {
    clearSelection: ['x', 'delete', 'backspace'],
    resetView:      ['esc'],
    showDevTools:   ['shift+t', 'd e v'],
    downloadView:   ['shift+b'],
  },
}

// Default `topics`
export const MapLayerSources = [
  {
    id: 'covid19@noop.pw',
    label: 'Covid-19 Pandemic',
    src: '/api/resources/bot/covid19@noop.pw',
    icon: 'graph',
  },
  {
    id: 'projects@import.bot',
    label: 'CRI Projects',
    src: '/api/resources/bot/projects@import.bot',
    icon: 'graph',
  },
  {
    id: 'theconversationfr@import.bot',
    label: 'The Conversation',
    src: '/api/resources/feed/theconversation.fr',
    icon: 'feed',
  },
  {
    id: 'everything',
    label: 'Everything',
    src: '/api/resources/',
    icon: 'layout-grid',
    default: true,
  },
]

export const WebSocketURI = 'wss://welearn.cri-paris.org/carte/ws'


export const ContourColors = [
  '#b9e3ff',
  '#acd0a5',
  '#94bf8b',
  '#a8c68f',
  '#bdcc96',
  '#d1d7ab',
  '#efebc0',
  '#ded6a3',
  '#d3ca9d',
  '#cab982',
  '#e0e0e0',
]

export const EXTENTS_EN = {
  // [min, max]
  x: [-8.023, 12.664],
  y: [-7.113, 8.436],
}
