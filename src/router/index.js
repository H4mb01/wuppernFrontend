import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Wuppern from "../views/Wuppern.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/help',
    name: 'Hilfe',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Help.vue')
  },
  {
    path: "/wuppern",
    name: "Wuppern",
    component: Wuppern,
    props: true,
  }
]

const router = new VueRouter({
  routes
})

export default router
