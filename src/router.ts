import * as VueRouter from 'vue-router';
import HomeView from './views/HomeView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './views/LoginView.vue';

const routes: VueRouter.RouteRecordRaw[] = [
  {
    name: 'homeRoute',
    path: '/',
    component: HomeView,
  },
  {
    name: 'loginRoute',
    path: '/login',
    component: LoginView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
