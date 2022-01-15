import {createRouter, createWebHistory} from "vue-router";
import Home from './Pages/Home.vue'
import NotFound from "./Pages/NotFound.vue";
import Boards from "./Pages/Boards.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/boards',
    name: 'Boards',
    component: Boards,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  }
]
export const router = createRouter({
  history: createWebHistory(),
  routes,
});