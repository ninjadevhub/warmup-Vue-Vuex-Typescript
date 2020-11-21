import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import TheDashboard from '@/views/TheDashboard.vue'
import TheSignUp from '@/views/TheSignUp.vue'
import TheEmailVerification from '@/views/TheEmailVerification.vue'
import TheLogin from '@/views/TheLogin.vue'
import ThePasswordReset from '@/views/ThePasswordReset.vue'
import TheNewPassword from '@/views/TheNewPassword.vue'
import TheInboxes from '@/views/TheInboxes.vue'
import TheAccountDetails from '@/views/TheAccountDetails.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: '',
    redirect: 'inboxes',
    component: TheDashboard,
    children: [
      {
        path: '/inboxes',
        name: 'inboxes',
        component: TheInboxes
      },
      {
        path: '/account-settings',
        name: 'account-settings',
        component: TheAccountDetails
      }
    ]
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: TheSignUp
  },
  {
    path: '/email-verification',
    name: 'Email verification',
    component: TheEmailVerification
  },
  {
    path: '/login',
    name: 'login',
    component: TheLogin
  },
  {
    path: '/password-reset',
    name: 'password-reset',
    component: ThePasswordReset
  },
  {
    path: '/new-password',
    name: 'new-password',
    component: TheNewPassword
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
