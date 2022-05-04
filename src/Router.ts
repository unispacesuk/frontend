import { createRouter, createWebHistory } from 'vue-router';
import Home from './Pages/Home.vue';
import NotFound from './Pages/NotFound.vue';
import Blogs from './Pages/Blog/Blogs.vue';
import Article from './Pages/Blog/Article.vue';
import Boards from './Pages/Board/Boards.vue';
import Questions from './Pages/Question/Questions.vue';
import Board from './Pages/Board/Board.vue';
import Thread from './Pages/Board/Thread.vue';
import Dashboard from './Pages/Dashboard/Dashboard.vue';
import Admin from './Pages/Admin/Admin.vue';
import Login from './Pages/Auth/Login.vue';
import Register from './Pages/Auth/Register.vue';
import Logout from './Pages/Auth/Logout.vue';
import Rooms from './Pages/Rooms/Rooms.vue';
import Room from './Pages/Rooms/Room.vue';
import ChangePassword from './Pages/Auth/ChangePassword.vue';
import AskQuestion from './Pages/Question/AskQuestion.vue';
import Question from './Pages/Question/Question.vue';
import UserProfile from './Pages/User/UserProfile.vue';

import { useUser } from './Stores/UserStore';
import { usePage } from './Stores/PageStore';

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
  {
    path: '/change-password',
    name: 'changePassword',
    component: ChangePassword,
    meta: {
      nonLoggedIn: true,
    },
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/user/:username',
    name: 'userProfile',
    component: UserProfile,
    meta: {
      requiresAuth: true,
    },
  },

  // board related routes
  { path: '/boards', name: 'boards', component: Boards },
  { path: '/boards/:boardId', name: 'board', component: Board },
  { path: '/thread/:threadId', name: 'thread', component: Thread },

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

  // blog routes
  { path: '/blogs', name: 'blogs', component: Blogs },
  { path: '/blog/article/:articleId', name: 'blogsArticle', component: Article },

  // room routes
  {
    path: '/rooms',
    name: 'rooms',
    component: Rooms,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/room/:roomId',
    name: 'room',
    component: Room,
    meta: {
      requiresAuth: true,
    },
  },

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
// I will also use this to set layouts...
router.beforeEach(async (to, from) => {
  const userStore = useUser();
  const pageStore = usePage();

  // TODO: this can of-course be improved to accommodate more layouts 🤔
  if (to.name === 'room') {
    pageStore.setPageLayout('chat-layout');
  } else {
    pageStore.setPageLayout('layout');
  }

  // const pageStore = usePage();

  // if the user refreshes... we need to auth from here.
  if (!userStore.user.username && localStorage.getItem('access-token')) {
    await userStore.authenticate();
  }

  // only for admins
  if (to.meta.requiresAuth && to.meta.isAdmin) {
    if (userStore.user.username && userStore.user.roleId === 1) {
      return true;
    }

    return router.back();
  }

  // only for logged in people
  if (to.meta.requiresAuth) {
    if (userStore.user.username) {
      return true;
    }

    return '/login';
  }

  // only for not logged in people
  if (to.meta.nonLoggedIn) {
    if (userStore.user.username) {
      return '/';
    }

    return true;
  }
});

export { router };
