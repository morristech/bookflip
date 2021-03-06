import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './components/App.vue'

import Buy from './components/Buy.vue'
import Sell from './components/Sell.vue'
import Login from './components/Login.vue'
import Signup from './components/Signup.vue'

import Auth from './auth.js'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Buy},
    { path: '/buy', component: Buy},
    { path: '/sell', component: Sell, meta: {auth: true}},
    { path: '/login', component: Login},
    { path: '/signup', component: Signup}
  ]
})

router.beforeEach((to, from, next) => {
  Auth.checkAuth()
  .then(function() {

    if(to.meta.auth && !Auth.user.authenticated){
      return next({path: '/login'})
    }
    return next()
  })
  .catch(error => {
    console.log(error)
    return next()
  })
})

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  render: h => h(App)
})