import {
  createRouter,
  createWebHashHistory, NavigationGuardNext, RouteLocationNormalized,
  RouteRecordRaw,
} from 'vue-router';
import store from '@/store';
import Home from '../views/Home.vue';

const ifNotAuthenticated = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/');
};

const ifAuthenticated = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/login');
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/wallet',
    name: 'Wallet',
    component: () => import('../views/Wallet.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/History.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/operation/income',
    name: 'OperationIncome',
    component: () => import('../views/Operation.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/operation/:id',
    name: 'OperationEdit',
    component: () => import('../views/Operation.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/operation/expense',
    name: 'OperationExpense',
    component: () => import('../views/Operation.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/operations',
    name: 'Operations',
    component: () => import('../views/Operations.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
