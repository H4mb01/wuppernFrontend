import Vue from 'vue'
import VueRouter from 'vue-router'
import Wuppern from "../views/Wuppern.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/help',
    name: 'Hilfe',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Help.vue')
  },
  {
    path: "/",
    name: "Wuppern",
    component: Wuppern,
    props: true,
  }
]

const router = new VueRouter({
  routes
})

export default router
