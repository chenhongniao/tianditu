<template>
  <div class="map" ref="map"></div>
</template>
<script>
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile.js';
import XYZ from 'ol/source/XYZ.js';

export default {
  name: 'tianditu',
  data(){
    return {
      map: null,
      key: '205b344d16c0dc0544b4b610328cedae',
      vec: 'http://t0.tianditu.gov.cn/vec_c/wmts?tk=',
      cva: 'http://t0.tianditu.gov.cn/cva_c/wmts?tk='
    }
  },
  computed:{
    urlCompute(){
      return {
      url_vec: this.vec + this.key,
      url_cva: this.cva + this.key
      }
    }   
  },
  mounted(){
    this.createMap()
  },
  methods: {
    createMap(){
      return new Map({
        target: this.$refs.map,
        layers: [
          new TileLayer({
            title: '天地图矢量图层',
            source: new XYZ({
              url: this.urlCompute.url_vec,
              wrapX: false
            })
          }),
          new TileLayer({
            title: '天地图矢量注记',
            source: new XYZ({
              url: this.urlCompute.url_cva,
              wrapX: false
            })
          })
        ],
        view: new View({
          center: [ 0, 0],
          zoom: 3,
          projection:"EPSG:4326"
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