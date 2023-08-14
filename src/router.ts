import * as VueRouter from 'vue-router';
import HomeView from './views/HomeView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes: VueRouter.RouteRecordRaw[] = [
  {
    name: 'homeRoute',
    path: '/',
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
