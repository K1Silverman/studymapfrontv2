import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import './tailwindstyles.css'

const app = createApp(App);
app.component('QuillEditor', QuillEditor);

app.use(router);
app.mount('#app');
