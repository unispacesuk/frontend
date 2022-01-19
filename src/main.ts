import { createApp } from 'vue';
import App from './App.vue';
import './Assets/tailwind.css';
import { router } from './Router';

import { BusService } from './Services/BusService';
// const bus = new BusService();

const app = createApp(App);
app.config.globalProperties.$bus = new BusService();
app.use(router);
app.mount('#app');

// createApp(App).use(router).mount('#app');
