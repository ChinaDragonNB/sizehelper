import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PeopleDetail from '../views/PeopleDetail.vue'
import ClothesList from '../views/ClothesList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/peopleDetail',
    name: 'PeopleDetail',
    component: PeopleDetail
  }, {
    path: '/clothes',
    name: 'ClothesList',
    component: ClothesList
  },
]

const router = new VueRouter({
  routes
})

export default router
