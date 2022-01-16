import { createRouter, createWebHistory } from 'vue-router';
import Home from './Pages/Home.vue';
import NotFound from './Pages/NotFound.vue';
import Boards from './Pages/Board/Boards.vue';
import Questions from './Pages/Questions.vue';
import Board from './Pages/Board/Board.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  // { path: '/home', name: 'home', component: Home },

  // Board related routes
  { path: '/boards', name: 'boards', component: Boards },
  { path: '/board/:id', name: 'board', component: Board },

  { path: '/questions', name: 'questions', component: Questions },
  { path: '/:pathMatch(.*)*', name: 'notfound', component: NotFound },
];
export const router = createRouter({
  history: createWebHistory(),
  routes,
});
