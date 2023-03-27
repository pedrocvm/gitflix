import { Module } from 'vuex';
import { RootState, LoadingState } from '../types';

const loading: Module<LoadingState, RootState> = {
  namespaced: true,
  state: {
    isLoading: false,
  },
  getters: {
    getIsLoading: (state) => state.isLoading,
  },

  mutations: {
    setLoading(state, { isLoading }: LoadingState) {
      state.isLoading = isLoading;
    },
  },

  actions: {
    handleLoading({ commit }, { isLoading }: LoadingState) {
      commit('setLoading', {
        isLoading,
      });
    },
  },
};

export default loading;
