import Vue from 'vue';
import store from '@/store';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home/Home.vue';
import Auth from '@/views/Auth/Auth.vue';
import MyRepositories from '@/views/MyRepositories/MyRepositories.vue';
import MyProfile from '@/views/MyProfile/MyProfile.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/my-repositories',
    name: 'myRepositories',
    component: MyRepositories,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: MyProfile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, _, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = store.getters['user/getUser'];

  if (requiresAuth && !isAuthenticated) {
    next('/auth');
  } else if (to.path === '/auth' && isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
