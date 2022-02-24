import { createApp } from 'vue';
import App from './App.vue';
import './Assets/index.css';
import { router } from './Router';
import { setupDevtools } from 'class-stores-plugin';

import { createPinia } from 'pinia';

import { BusService } from './Services/BusService';
const bus = new BusService();

const app = createApp(App);
setupDevtools(app, 3);

// global properties
app.config.globalProperties.$bus = bus;
app.provide('$bus', bus);
app.provide('urlBase', 'https://app.unispaces.test');
// app.provide('avatarBase', 'https://api.unispaces.uk/avatar/');
app.provide('avatarBase', 'https://api.unispaces.test/avatar/');
// app.provide('avatarBase', 'http://localhost:3000/avatar/')

app.use(router);
app.use(createPinia());
app.mount('#app');

// createApp(App).use(router).mount('#app');
