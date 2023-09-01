import * as VueRouter from 'vue-router';
import HomePageView from './views/HomePageView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './components/LoginModal.vue';

const routes: VueRouter.RouteRecordRaw[] = [
  {
    name: 'homeRoute',
    path: '/',
    component: HomePageView,
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
