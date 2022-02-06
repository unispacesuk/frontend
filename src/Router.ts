import { createRouter, createWebHistory } from 'vue-router';
import Home from './Pages/Home.vue';
import NotFound from './Pages/NotFound.vue';
import Boards from './Pages/Board/Boards.vue';
import Questions from './Pages/Question/Questions.vue';
import Board from './Pages/Board/Board.vue';
import Thread from './Pages/Board/Thread.vue';
import Dashboard from './Pages/Dashboard/Dashboard.vue';
import Admin from './Pages/Admin/Admin.vue';

// guards
import { AdminGuard } from './Guards/AdminGuard';
import AskQuestion from './Pages/Question/AskQuestion.vue';
import Question from './Pages/Question/Question.vue';

// other routes
const routes = [
  { path: '/', name: 'home', component: Home },
  // { path: '/home', name: 'home', component: Home },

  // admin
  { path: '/admin', name: 'adminPanel', component: Admin },

  //user
  { path: '/dashboard', name: 'dashboard', component: Dashboard },

  // board related routes
  { path: '/boards', name: 'boards', component: Boards },
  { path: '/boards/:id', name: 'board', component: Board },
  { path: '/thread/:id', name: 'thread', component: Thread },

  // question routes
  { path: '/questions', name: 'questions', component: Questions },
  { path: '/questions/ask', name: 'askQuestion', component: AskQuestion },
  { path: '/questions/:id', name: 'question', component: Question },

  // utils
  { path: '/:pathMatch(.*)*', name: 'notfound', component: NotFound },
];

const authedRoutes: string[] = ['dashboard', 'addQuestion'];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'text-gray-400', // this can change in the future
  routes,
});

// Navigation Guards!!!
router.beforeEach(async (to, from) => {
  // if going to admin panel
  if (to.name === 'adminPanel') {
    const isAdmin = await AdminGuard();
    if (!isAdmin) return '/';
  }

  // authed routes
  if (authedRoutes.includes(<string>to.name, 0)) {
    console.log('authed route here');
  }
});

export { router };
