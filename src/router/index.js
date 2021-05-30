import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PeopleDetail from '../views/PeopleDetail.vue'
import ClothesList from '../views/ClothesList.vue'
import ClothesDetail from '../views/ClothesDetail.vue'

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
  }, {
    path: '/clothesDetail',
    name: 'ClothesDetail',
    component: ClothesDetail
  },
]

const router = new VueRouter({
  routes
})

export default router
