import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import './tailwindstyles.css'
import { createVfm } from 'vue-final-modal'
import axios from 'axios';
import VueAxios from 'vue-axios';
import { createPinia } from 'pinia';

const app = createApp(App);
const vfm = createVfm();

app.component('QuillEditor', QuillEditor);
app.use(router);
app.use(vfm);
axios.defaults.baseURL = 'http://localhost:8080'
app.use(VueAxios, axios);
app.use(createPinia());
app.mount('#app');
