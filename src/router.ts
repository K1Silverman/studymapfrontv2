import * as VueRouter from 'vue-router';
import Cookies from 'js-cookie';
import HomePageView from './views/HomePageView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import { useLoginStatusStore } from './stores/LoginStatusStore';

const routes: VueRouter.RouteRecordRaw[] = [
  {
    name: 'homePageRoute',
    path: '/',
    component: HomePageView,
  },
  {
    name: 'homeRoute',
    path: '/home',
    component: HomeView,
    meta: {
      requiresAuth: true,
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



router.beforeEach((to, from, next) => {
  const loginStatusStore = useLoginStatusStore();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (Cookies.get('sessionHash') === undefined) {
      next({name: 'homePageRoute'})
    } else {
      next()
    }
  } else {
    next();
  }
})

export default router;
