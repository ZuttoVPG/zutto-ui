import Vue from 'vue'
import Router from 'vue-router'
import store from '../stores'

import auth from './auth'
import user from './user'

import Home from '@/components/Home'
import {NotFound} from '@/components/errors'

Vue.use(Router)

var router = new Router({
  mode: 'history',
  routes: [].concat(
    {
      path: '/',
      name: 'public.home',
      component: Home
    },
    auth,
    user,
    {
      path: '*',
      name: 'public.not-found',
      component: NotFound
    }
  )
})

router.beforeEach((to, from, next) => {
  if (to.name.startsWith('public.')) {
    return next()
  }

  if (store.state.authUser) {
    return next()
  }

  return next('/login')
})

export default router
