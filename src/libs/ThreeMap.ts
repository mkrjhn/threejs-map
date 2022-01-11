import * as maptalks from 'maptalks'
import { ThreeLayer } from 'maptalks.three'
import { DoubleSide, HemisphereLight, LineBasicMaterial, MeshPhongMaterial, Raycaster, Vector3 } from 'three'

import type { Map, MapOptions } from 'maptalks'
import type { GeoJSONCollection } from 'maptalks.three/dist/type'

// interface CustomizedGeoJson extends GeoJSONCollection {
//   properties: {
//     NAME: string
//     OKATO: string
//     OKTMO: string
//     NAME_AO: string
//     OKATO_AO: string
//     ABBREV_AO: string
//     TYPE_MO: string
//   }
// }

export default class ThreeMap {
  options: MapOptions
  map: Map
  threeLayer: ThreeLayer
  hemisphereLight: HemisphereLight
  raycaster: Raycaster
  cameraPosition: Vector3

  constructor(container: HTMLElement, params: MapOptions) {
    this.options = params

    this.map = new maptalks.Map(container, {
      baseLayer: new maptalks.TileLayer('baseLayer', {
        urlTemplate: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        subdomains: ['a', 'b', 'c'],
        attribution:
          '&copy; <a href="http://osm.org">OpenStreetMap</a> '
          + 'contributors, &copy; <a href="https://carto.com/">CARTO</a>'
      }),
      ...params
    })

    this.threeLayer = new ThreeLayer('threeLayer', {
      forceRenderOnMoving: false,
      forceRenderOnRotating: false,
      forceRenderOnZooming: false
    })

    this.hemisphereLight = new HemisphereLight('#ffffff', '#a5a5a5', 1.15)
    this.raycaster = new Raycaster()
    this.cameraPosition = new Vector3()
  }

  get extent() {
    return this.map.getExtent()
  }

  get projection() {
    return this.map.getProjection()
  }

  get scene() {
    return this.threeLayer.getScene()
  }

  get camera() {
    return this.threeLayer.getCamera()
  }

  init(geo: GeoJSONCollection) {
    this.map.setMaxExtent(this.extent)
    this.map.addLayer(this.threeLayer)

    this.threeLayer.prepareToDraw = (gl, scene) => {
      scene.add(this.hemisphereLight)
      this.getMesh(geo)
      console.log(this.threeLayer.getMeshes())
      // this.threeLayer.redraw()
    }
  }

  getMesh(geo: GeoJSONCollection) {
    const { threeLayer } = this

    const geometryList = maptalks.GeoJSON.toGeometry(geo, (geometry) => {
      const materialArea = new MeshPhongMaterial({
        side: DoubleSide
      })

      // const materialWire = new LineBasicMaterial({
      //   color: '#000000',
      //   opacity: 0.5,
      //   linewidth: 1
      // })

      const mesh = threeLayer.toExtrudeMesh(geometry, 0, materialArea, 1)
      // this.scene.add(mesh)
      threeLayer.addMesh(mesh)
      // const wire = threeLayer.toExtrudeWire(geometry, 0, materialWire, 1)
    })

    // geometryList.forEach(e => {
    //   console.log(e)
    // })
  }
}
