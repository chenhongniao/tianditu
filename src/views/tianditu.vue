<template>
  <div class="map" ref="map"></div>
</template>
<script>
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile.js';
import WMTS from 'ol/source/WMTS.js';
import * as olProj from 'ol/proj';
import * as olExtent from 'ol/extent';
import Attribution from 'ol/control/Attribution.js';


export default {
  name: 'tianditu',
  data(){
    return {
      map: null,
      key: '37d614f39eb9dcfa72b2f1ab5aff22ff',
      vec: 'http://t0.tianditu.gov.cn/vec_c/wmts?tk=',
      cva: 'http://t0.tianditu.gov.cn/cva_c/wmts?tk=',
      projection: olProj.get('EPSG:4326'),
      resolutions: new Array(14),
      matrixIds: new Array(14)

    }
  },
  computed:{
    urlCompute(){
      return {
      url_vec: this.vec + this.key,
      url_cva: this.cva + this.key
      }
    },
    projectionExtent(){
      return this.projection.getExtent()
    },
    size(){
      return olExtent.getWidth(this.projectionExtent) / 256
    },
    attribution(){
      return new Attribution({
        html: '<strong>数据来源：天地图</strong>'
      })
    },
    wmtsLayer_cva(){
      return new TileLayer({
        title: '天地图矢量图层',
        opacity: 1,
        source: new WMTS({
          attributions: [this.attribution],
          url: url_cva,
          matrixSet: 'c',
          format: 'png'

        })
      })
    }
  },
  created(){
    this.computeArray()
  },
  mounted(){
    this.createMap()
  },
  methods: {
    computeArray(){
      this.resolutions.forEach((v,i)=>{
        v = this.size / Math.pow(2,i)
      });
      this.matrixIds.forEach((v,i)=>{
        v = i
      })
    },
    createMap(){
      new Map({
        target: this.$refs.map,
        layers: [
          new TileLayer({
            title: '天地图矢量图层',
            source: new WMTS({
              url: this.urlCompute.url_vec,
              wrapX: false
            })
          }),
          new TileLayer({
            title: '天地图矢量注记',
            source: new WMTS({
              url: this.urlCompute.url_cva,
              wrapX: false
            })
          })
        ],
        view: new View({
          center: [ 0, 0],
          zoom: 3,
          projection: projection
        })
      })
    }
  }


}
</script>
<style lang="less">
  .map{
    width: 100%;
    height: 800px;
  }
</style>