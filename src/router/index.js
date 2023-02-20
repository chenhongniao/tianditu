import Vue from 'vue'
import VueRouter from 'vue-router'
import Tmap from '@/views/tianditu.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name: 'tmap',
    component: Tmap
  }
]

const router = new VueRouter({
  routes
})

export default router
