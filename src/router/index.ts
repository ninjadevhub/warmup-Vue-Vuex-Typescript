import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import TheDashboard from '@/views/TheDashboard.vue'
import TheSignUp from '@/views/TheSignUp.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Dashboard',
    component: TheDashboard
  },
  {
    path: '/sign-up',
    name: 'Sign up',
    component: TheSignUp
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
