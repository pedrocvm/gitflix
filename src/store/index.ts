import Vue from 'vue';
import Vuex from 'vuex';
import { initialRootState, RootState } from './types';
import auth from './modules/auth';
import user from './modules/user';
import toast from './modules/toast';
import loading from './modules/loading';
import repositories from './modules/repositories';

Vue.use(Vuex);

const store = new Vuex.Store<RootState>({
  state: initialRootState,
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});

store.registerModule('auth', auth);
store.registerModule('user', user);
store.registerModule('toast', toast);
store.registerModule('loading', loading);
store.registerModule('repositories', repositories);
store.dispatch('auth/initAuth');

export default store;
