import Vue, { createApp } from 'vue';
import VueRouter from 'vue-router';
import HomeView from './components/HomeView.vue'

const routes = [
  { path: '/', component: HomeView }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})

const app = Vue.createApp({});

app.use(router);

app.mount('#app');
