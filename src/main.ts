import { createApp } from 'vue';
// import { W } from 'vite';
import App from './App.vue';
import { router } from './Router';
import './Assets/index.scss';

import { createPinia } from 'pinia';

import { BusService } from './Services/BusService';
const bus = new BusService();

const app = createApp(App);

// const webSocket = new WebSocket('wss://ws.unispaces.test');
// app.provide('websocket', webSocket);

// global properties
app.config.globalProperties.$bus = bus;
app.provide('$bus', bus);
app.provide('urlBase', import.meta.env.VITE_BASE);
app.provide('avatarBase', import.meta.env.VITE_API + '/avatar/');
app.provide('resourceBase', import.meta.env.VITE_API + '/resource/');
app.provide('avatarApi', import.meta.env.VITE_AVATAR_API);

app.use(router);
app.use(createPinia());
app.mount('#app');
