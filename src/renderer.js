/* eslint no-multi-spaces: 0 */
import FileSaver from 'file-saver'
import Mousetrap from './utils/mousetrap'
import _throttle from 'lodash/throttle'
import _debounce from 'lodash/debounce'
import _flatMap from 'lodash/flatMap'

import setupDebugger from './renderer-debugger'
import { nodePicker, selectedConcepts, userResources, didPickLayer, $layerSource } from './store'
import { fetchBaseLayer, request, fetchSelectionPoints } from './layers'

import { LayerProps, KeyBinding } from './consts'



export const setupMapView = async (conf) => {
  const layerData = await request().then((nodes) => {return nodes.results});
  const layer = layerData.map((nodes) => {return fetchBaseLayer(nodes)});
  var allPoints = [].concat.apply([], layer);

  if(conf.settings){
    _.merge(LayerProps, conf.settings);
  }

  const elevation = DotAtlas.createLayer({
    type: 'elevation',
    points: allPoints,
    ...LayerProps.elevation,
  })

  const selectionOutline = DotAtlas.createLayer({
    type: 'outline',
    points: [],
    ...LayerProps.selectionOutline,
  })

  const hoverMarkers = DotAtlas.createLayer({
    type: 'marker',
    points: [],
    ...LayerProps.hoverMarkers,
  })

  const hoverOutline = DotAtlas.createLayer({
    type: 'outline',
    points: [],
    ...LayerProps.hoverOutline,
  })

  const markers = DotAtlas.createLayer({
    type: 'marker',
    points: allPoints,
    ...LayerProps.markers,

    onPointHover: (e) => {
      const hoverPts = e.points.filter((pt) => pt.canPick)

      hoverMarkers.set('points', hoverPts)
      hoverOutline.set('points', hoverPts)
      atlas.redraw()
    },
    onPointClick: (e) => {
      const filteredPts = e.points.filter((pt) => pt.canPick)
      if (!(e.ctrlKey || e.shiftKey)) {
        nodePicker.replace(filteredPts)
      } else {
        nodePicker.merge(filteredPts)
      }
    },
  })

  const labels = DotAtlas.createLayer({
    type: 'label',
    points: allPoints,
    ...LayerProps.labels,
  })

  const layers = {
    elevation,
    selectionOutline,
    hoverMarkers,
    hoverOutline,
    markers,
    labels,
  }

  const eventTaps = {
    didClick: (e, ...args) => {
    },
    didDoubleClick: (e, ...args) => {
    },
    didHover: (e, ...args) => {
    },
    didMouseWheel: (e, ...args) => {
    },
    didResizeViewport: (() => {
      // Based on AutoResizing plugin for dotaltas. Reimplemented here with
      // lodash.
      // Basic resizing is fast, as per the comments in the said plugin, however
      // labels need to be updated and that should be throttled.
      // This is an iife, since we want to save the references to throttled
      // handlers.
      const deferredNotifyLabelsUpdate = _debounce(() => {
        labels.update('labelVisibilityScales')
        atlas.redraw()
      }, 200)
      return () => {
        atlas.resize()
        deferredNotifyLabelsUpdate()
      }
    })(),
  }

  const atlas = DotAtlas
    .embed({
      element: conf.element,
      layers: [
        elevation,
        markers,
        selectionOutline,
        hoverOutline,
        hoverMarkers,
        labels,
      ],
      pixelRatio: Math.ceil(Math.max(window.devicePixelRatio, 1)),
      onClick: eventTaps.didClick,
      onHover: eventTaps.didHover,
      onMouseWheel: eventTaps.didMouseWheel,
      onDoubleClick: eventTaps.didDoubleClick,
    })


  class mapt {
    constructor () {
    }

    get centerPoint () {
      const { height, width } = conf.element.getBoundingClientRect()
      const [ ptx, pty, _ ] = atlas.screenToPointSpace(width / 2, height / 2)
      return { x: ptx, y: pty, zoom: this.zoom }
    }

    set centerPoint ({ x, y, zoom }) {
      atlas.centerPoint(x, y, zoom)
    }

    get zoom () {
      return atlas.get('zoom')
    }
    set zoom (value) {
      // If we let zoom value go below zero, weird things happen. Weird but cool.
      this.centerPoint = { ...this.centerPoint, zoom: Math.max(value, 0.05) }
    }

    get x () {
      return this.centerPoint.x
    }
    set x (value) {
      this.centerPoint = { ...this.centerPoint, x: value }
    }

    get y () {
      return this.centerPoint.y
    }
    set y (value) {
      this.centerPoint = { ...this.centerPoint, y: value }
    }
  }
  atlas.mapt = new mapt()

  const debugUi = setupDebugger(atlas, layers, conf.element)
  const keyboardTrigger = new Mousetrap()

  keyboardTrigger
    .bind(KeyBinding.panning.left,  _throttle(() => mapt.x += -1, 200))
    .bind(KeyBinding.panning.right, _throttle(() => mapt.x += 1, 200))
    .bind(KeyBinding.panning.up,    _throttle(() => mapt.y += -1, 200))
    .bind(KeyBinding.panning.down,  _throttle(() => mapt.y += 1, 200))
    .bind(KeyBinding.zooming.plus,  _throttle(() => mapt.zoom += 1, 200))
    .bind(KeyBinding.zooming.minus, _throttle(() => mapt.zoom += -1, 200))
    .bind(KeyBinding.control.clearSelection, () => nodePicker.reset())
    .bind(KeyBinding.control.downloadView, () => {
      FileSaver.saveAs(atlas.get('imageData'), 'atlas-im.png')
    })
    .bind(KeyBinding.control.showDevTools, () => {
      debugUi.show()
      debugUi.closed
        ? debugUi.open()
        : debugUi.close()
    })

  selectedConcepts.watch((selection) => {
    selectionOutline.set('points', selection.toJS())
    atlas.redraw()
    const resourcesSelection = fetchSelectionPoints(selection.toJS(), layerData)
    const event = new CustomEvent("searchMap",{
      detail:  {
          type: "add",
          selection: resourcesSelection
    }});
    dispatchEvent(event)

  })

  window.addEventListener('resize', eventTaps.didResizeViewport)
  window.addEventListener("resetSearch", nodePicker.reset());

  window.atlas = atlas

  return atlas
}
