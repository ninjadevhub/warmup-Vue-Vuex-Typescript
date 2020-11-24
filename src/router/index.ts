import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import TheDashboard from '@/views/TheDashboard.vue'
import TheSignUp from '@/views/TheSignUp.vue'
import TheEmailVerification from '@/views/TheEmailVerification.vue'
import TheLogin from '@/views/TheLogin.vue'
import ThePasswordReset from '@/views/ThePasswordReset.vue'
import TheNewPassword from '@/views/TheNewPassword.vue'
import TheInboxes from '@/views/TheInboxes.vue'
import TheInbox from '@/views/TheInbox.vue'
import TheAccountDetails from '@/views/TheAccountDetails.vue'
import TheBilling from '@/views/TheBilling.vue'

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
        component: TheInboxes,
        meta: {
          title: 'Inboxes'
        }
      },
      {
        path: '/inboxes/:inboxId',
        name: 'inbox-details',
        component: TheInbox,
        meta: {
          title: '{email}' // TODO: make dynamic
        }
      },
      {
        path: '/account-settings',
        name: 'account-settings',
        component: TheAccountDetails,
        meta: {
          title: 'Account Settings'
        }
      },
      {
        path: '/billing',
        name: 'billing',
        component: TheBilling,
        meta: {
          title: 'Billing'
        }
      }
    ]
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: TheSignUp,
    meta: {
      title: 'Sign Up'
    }
  },
  {
    path: '/email-verification',
    name: 'Email verification',
    component: TheEmailVerification,
    meta: {
      title: 'Email Verification'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: TheLogin,
    meta: {
      title: 'Log In'
    }
  },
  {
    path: '/password-reset',
    name: 'password-reset',
    component: ThePasswordReset,
    meta: {
      title: 'Password Reset'
    }
  },
  {
    path: '/new-password',
    name: 'new-password',
    component: TheNewPassword,
    meta: {
      title: 'New Password'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Warmup Inbox`
  next()
})

export default router
