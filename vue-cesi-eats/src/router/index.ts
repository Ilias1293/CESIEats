import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import SearchPage from '../views/SearchPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import OrdersPage from '../views/OrdersPage.vue'
import RestaurantPage from '../views/RestaurantPage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import { Component } from 'ionicons/dist/types/stencil-public-runtime';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/search',
    name: 'SearchPage',
    component: SearchPage
  },
  {
    path: '/profile',
    name: 'ProfilePage',
    component: ProfilePage
  },
  {
    path: '/orders',
    name: 'OrdersPage',
    component: OrdersPage
  },
  {
    path: '/restaurant',
    name: 'RestaurantPage',
    component: RestaurantPage
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
