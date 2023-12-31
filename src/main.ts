import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import './tailwindstyles.css';
import 'vue-final-modal/style.css'
import { createVfm } from 'vue-final-modal';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { createPinia } from 'pinia';
import Cookies from 'js-cookie';

const app = createApp(App);
const vfm = createVfm();

app.config.globalProperties.$cookie = Cookies;

app.component('QuillEditor', QuillEditor);
app.use(router);
axios.defaults.baseURL = 'http://localhost:8080'
app.use(vfm);
app.use(VueAxios, axios);
app.use(createPinia());
app.mount('#app');
