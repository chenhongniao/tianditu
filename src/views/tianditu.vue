<template>
  <div class="map" ref="map"></div>
</template>
<script>
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile.js';
import WMTS from 'ol/source/WMTS.js';
import * as olProj from 'ol/proj';
import * as olExtent from 'ol/extent';
import WMTSTileGrid from 'ol/tilegrid/WMTS';


export default {
  name: 'tianditu',
  data() {
    return {
      map: null,
      key: '37d614f39eb9dcfa72b2f1ab5aff22ff',
      vec: 'http://t0.tianditu.gov.cn/vec_c/wmts?LAYER=vec&tk=',
      cva: 'http://t0.tianditu.gov.cn/cva_c/wmts?LAYER=cva&tk=',
      projection: olProj.get('EPSG:4326'),
      resolutions: new Array(19),
      matrixIds: new Array(19),
      myLayer: []
    }
  },
  computed: {
    urlCompute() {
      return {
        url_vec: this.vec + this.key,
        url_cva: this.cva + this.key
      }
    },
    projectionExtent() {
      return this.projection.getExtent()
    },
    size() {
      return olExtent.getWidth(this.projectionExtent) / 256
    },

    /* wmtsLayer_cva(){
      return new TileLayer({
        // title: '天地图矢量图层注记',
        opacity: 1,
        source: new WMTS({
          attributions: '<i>数据来源：天地图</i>',
          url: this.urlCompute.url_cva,
          matrixSet: 'c',
          format: 'png',
          projection: this.projection,
          tileGrid: new WMTSTileGrid({
            origin: olExtent.getTopLeft(this.projectionExtent),
            resolutions: this.resolutions,
            matrixIds: this.matrixIds
          }),
          style: 'default',
          wrapX: true
        })
      })
    }, */

    wmtsLayer_vec() { }
  },
  mounted() {
    this.computeArray(this.resolutions, this.matrixIds),
      // this.wmtsLayer(this.urlCompute.url_vec, this.projection, this.projectionExtent, this.resolutions, this.matrixIds),
      // this.wmtsLayer(this.urlCompute.url_cva, this.projection, this.projectionExtent, this.resolutions, this.matrixIds),
      this.wmtsLayer(this.urlCompute.url_vec),
      this.wmtsLayer(this.urlCompute.url_cva),
      this.createMap()
    // this.test(this.attribution),
    // this.test(this.urlCompute.url_cva),
    // this.test(this.projection)
    // this.test(this.projectionExtent),
    // this.test(this.resolutions),
    // this.test(this.matrixIds)
  },
  methods: {
    // 创建layers对象
    wmtsLayer(url, projection = this.projection, projectionExtent = this.projectionExtent, resolutions = this.resolutions, matrixIds = this.matrixIds) {
      this.myLayer.push(
        new TileLayer({
          // title: '天地图矢量图层注记',
          opacity: 1,
          source: new WMTS({
            attributions: '<i>数据来源：天地图</i>',
            url: url,
            matrixSet: 'c',
            format: 'png',
            projection: projection,
            tileGrid: new WMTSTileGrid({
              origin: olExtent.getTopLeft(projectionExtent),
              resolutions: resolutions,
              matrixIds: matrixIds
            }),
            style: 'default',
            wrapX: true
          })
        })
      )
    },


    computeArray(resolution, matrix) {
      // console.log(this);
      for (let i = 0; i < resolution.length; i++) {
        resolution[i] = this.size / Math.pow(2, i)
        matrix[i] = i
      }
      // new Array() 创建的是一个稀疏数组，
      // 对于稀疏数组 map、filter、foreach 等方法并不会调用传入的第一个参数
      /*       console.log(this);
            this.resolutions = this.resolutions.map(function(_ ,i){
              console.log(this);
              return this.size / Math.pow(2,i)
              // console.log(this);
            });
             this.matrixIds= this.matrixIds.map(function(v,i){
              return i
            }) */
    },
    createMap() {
      this.map = new Map({
        target: this.$refs.map,
        layers: this.myLayer,
        view: new View({
          center: [0, 0],
          zoom: 3,
          projection: this.projection
        })
      })
    },
    test(val) {
      console.log(val);
    }
  }


}
</script>
<style lang="less">
.map {
  width: 100%;
  height: 1000px;
}
</style>