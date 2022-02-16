import { createRouter, createWebHistory } from 'vue-router';
import Home from './Pages/Home.vue';
import NotFound from './Pages/NotFound.vue';
import Boards from './Pages/Board/Boards.vue';
import Questions from './Pages/Question/Questions.vue';
import Board from './Pages/Board/Board.vue';
import Thread from './Pages/Board/Thread.vue';
import Dashboard from './Pages/Dashboard/Dashboard.vue';
import Admin from './Pages/Admin/Admin.vue';
import Login from './Pages/Auth/Login.vue';
import Register from './Pages/Auth/Register.vue';
import Logout from './Pages/Auth/Logout.vue';

// guards
import { AdminGuard } from './Guards/AdminGuard';
import AskQuestion from './Pages/Question/AskQuestion.vue';
import Question from './Pages/Question/Question.vue';
import { useUser } from './Stores/UserStore';

// other routes
const routes = [
  { path: '/', name: 'home', component: Home },
  // { path: '/home', name: 'home', component: Home },

  // admin
  {
    path: '/admin',
    name: 'adminPanel',
    component: Admin,
    meta: {
      requiresAuth: true,
      isAdmin: true,
    },
  },

  // user
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      nonLoggedIn: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      nonLoggedIn: true,
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  { path: '/logout', name: 'logout', component: Logout },

  // board related routes
  { path: '/boards', name: 'boards', component: Boards },
  { path: '/boards/:id', name: 'board', component: Board },
  { path: '/thread/:id', name: 'thread', component: Thread },

  // question routes
  { path: '/questions', name: 'questions', component: Questions },
  // { path: '/questions/tag/:tag', name: 'searchQuestionsByTag', component: Questions },
  { path: '/questions/search', name: 'searchQuestions', component: Questions },
  {
    path: '/questions/ask',
    name: 'askQuestion',
    component: AskQuestion,
    meta: {
      requiresAuth: true,
    },
  },
  { path: '/questions/:id', name: 'question', component: Question },

  // utils
  { path: '/:pathMatch(.*)*', name: 'notfound', component: NotFound },
];

const authedRoutes: string[] = ['dashboard', 'addQuestion', 'register'];
// const nonAuthedRoutes: string[] = ['login', 'register'];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'text-gray-400', // this can change in the future
  routes,
});

// Navigation Guards!!!
router.beforeEach(async (to, from) => {
  const userStore = useUser();

  if (to.meta.requiresAuth && to.meta.isAdmin) {
    // @ts-ignore
    if (userStore.user.username && userStore.user.role === 'admin') {
      return true;
    }

    return router.back();
  }

  if (to.meta.requiresAuth) {
    // @ts-ignore
    if (userStore.user.username) {
      return true;
    }

    return '/login';
  }

  if (to.meta.nonLoggedIn) {
    if (userStore.user.username) {
      return '/';
    }

    return true;
  }
});

export { router };
