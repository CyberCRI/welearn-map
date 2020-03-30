import { AutoResizing, Theme } from './dotatlas'
import FileSaver from 'file-saver'
import _ from 'lodash'

import { baseLayers } from './dataset'

const fetchGroupLayer = async (id) => {
  const layers = {
    project: 'https://deploy-preview-149--welearn-dev.netlify.com/api/resources/bot/projects@import.bot'
  }
  return await fetch(layers[id])
    .then((r) => r.json())
    .then(({ concepts }) => {
      let title

      return concepts.map((p) => {
        title = p.title_fr || p.title_en

        return {
          x: p.x_map_fr,
          y: p.y_map_fr,
          markerShape: 'square',
          label: _.truncate(title, { length: 16, separator: ' ' }),
          elevation: Math.max(p.elevation, .01),
        }
      }).filter((p) => p.x && p.y)
    })
}


const atlasInit = async (node) => {
  const container = document.getElementById(node)

  const basePts = baseLayers.points.map((o) => ({ ...o, elevation: 0.01 }))
  console.log(baseLayers)
  const baseLbls = baseLayers.labels
  const selection = new Set()

  const elevation = DotAtlas.createLayer({
    type: 'elevation',
    points: basePts,
    elevationPow: 1,
    maxRadiusDivider: 15,
    contourWidth: 0,
    lightAltitude: 10,
    lightIntensity: .2,
  })

  const selectionMarkers = DotAtlas.createLayer({
    type: 'marker',
    points: [],
    markerFillOpacity: 1,
  })

  const selectionOutline = DotAtlas.createLayer({
    type: 'outline',
    outlineFillColor: [0x95, 0xD0, 0xDF, 0x55],
    outlineStrokeColor: [0x22, 0x29, 0x30, 0x90],
    outlineStrokeWidth: .4,
    points: [],
    outlineRadiusOffset: 15,
  })

  const hoverMarkers = DotAtlas.createLayer({
    points: [],
    type: 'marker',
    markerFillOpacity: 0.2,
    markerStrokeWidth: 1,
    markerSizeMultiplier: 5,
  })

  const hoverOutline = DotAtlas.createLayer({
    points: [],
    type: 'outline',
    outlineFillColor: [160, 204, 255, 100],
    outlineStrokeColor: [36, 60, 75, 255],
    outlineStrokeWidth: 0.5,

    // How much to offset the outline boundary from the markers.
    outlineRadiusOffset: 10,
    outlineRadiusMultiplier: 15,
  })

  const markers = DotAtlas.createLayer({
    type: 'marker',
    points: baseLbls,

    markerSizeMultiplier: 5,
    markerStrokeWidth: 0,
    markerOpacity: 1,

    minAbsoluteMarkerSize: 0,

    pointHoverRadiusMultiplier: 10,
    onPointHover: (e) => {
      hoverMarkers.set('points', e.points)
      hoverOutline.set('points', e.points)
      dotatlas.redraw()
    },
    onPointClick: (e) => {
      if (e.ctrlKey) {
        selection.clear()
      }

      if (e.points.length > 0) {
        e.points.forEach((point) => selection.add(point))
      }

      selectionOutline.set('points', Array.from(selection))
      dotatlas.redraw()
    }
  })

  const labels = DotAtlas.createLayer({
    type: 'label',
    points: baseLbls,
    labelFontFamily: 'IBM Plex Sans',
    labelFontSize: 15,
    labelFontWeight: 800,
    labelFontVariant: 'normal',
    labelOpacity: 1,
  })

  const dotatlas = DotAtlas
    .with(AutoResizing, Theme)
    .embed({
      element: container,
      layers: [
        elevation,
        markers,
        selectionOutline,
        selectionMarkers,
        hoverOutline,
        hoverMarkers,
        labels,
      ],
      pixelRatio: 2,
      onMouseWheel: (e) => {
        const zoom = dotatlas.get('zoom')
        if ((zoom >= 20 && e.delta > 0) || (zoom <= 1 && e.delta < 0)) {
          e.preventDefault()
        }
      },
      onDoubleClick: (e) => console.log(e),
    })

  const prev_pts = {
    elevation: elevation.get('points'),
    labels: labels.get('points'),
    markers: markers.get('points'),
  }

  const updateOverlay = (id) => {
    fetchGroupLayer(id)
      .then((pts) => {
        elevation.set('points', [...prev_pts.elevation, ...pts])
        elevation.update('xy')

        labels.set('points', [...prev_pts.labels, ...pts])
        labels.update('xy')
        labels.update('labelVisibilityScales')
        labels.update('labelOpacity')
        labels.update('labelColor')
        labels.update('labelBoxColor')
        labels.update('labelBoxOpacity')

        markers.set('points', [...prev_pts.markers, ...pts])
        markers.update('xy')
        markers.update('markerSize')

        markers.update('markerColor')
        markers.update('markerOpacity')
        markers.update('markerShape')

        elevation.update('elevation')

        dotatlas.redraw()
      })
  }

  const onRaF = () => {
    window.requestAnimationFrame(onRaF)
  }

  // updateOverlay('project')
  window.requestAnimationFrame(onRaF)

  dotatlas.saveView = () => {
    const blob = dotatlas.get('imageData')
    FileSaver.saveAs(blob, 'atlas.png')
  }

  // window.setTimeout(dotatlas.saveView, 4000)
  // dotatlas.saveView()

  window.atlas = dotatlas
}


window.addEventListener('load', async () => {
  atlasInit('atlas-view')
})
