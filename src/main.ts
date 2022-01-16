import { createApp } from 'vue';
import App from './App.vue';
import './Assets/tailwind.css';
import { router } from './Router';
import mitt from 'mitt';

const app = createApp(App);
app.config.globalProperties.$event = mitt();
app.use(router);
app.mount('#app');

// createApp(App).use(router).mount('#app');
