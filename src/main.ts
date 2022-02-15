import { createApp } from 'vue';
import App from './App.vue';
import './Assets/index.css';
import { router } from './Router';

import { BusService } from './Services/BusService';
const bus = new BusService();

const app = createApp(App);

// global properties
app.config.globalProperties.$bus = bus;
app.provide('$bus', bus);

app.use(router);
app.mount('#app');

// createApp(App).use(router).mount('#app');
