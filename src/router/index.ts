import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import TheDashboard from '@/views/TheDashboard.vue'
import TheSignUp from '@/views/TheSignUp.vue'
import TheEmailVerification from '@/views/TheEmailVerification.vue'
import TheLogin from '@/views/TheLogin.vue'
import ThePasswordReset from '@/views/ThePasswordReset.vue'

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
  },
  {
    path: '/email-verification',
    name: 'Email verification',
    component: TheEmailVerification
  },
  {
    path: '/login',
    name: 'Log in',
    component: TheLogin
  },
  {
    path: '/password-reset',
    name: 'Password reset',
    component: ThePasswordReset
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
