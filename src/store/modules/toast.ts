import { Module } from 'vuex';
import { RootState, ToastState } from '../types';

const initialState: ToastState = {
  type: 'success',
  message: '',
  visible: false,
  timeout: 3000,
  action: 'close',
};

const toast: Module<ToastState, RootState> = {
  namespaced: true,
  state: initialState,
  getters: {},
  mutations: {
    setToast(state, { type, message, timeout, action = 'show' }: ToastState) {
      state.visible = action === 'show';
      state.type = action === 'show' ? type : 'success';
      state.message = action === 'show' ? message : '';
      state.timeout = action === 'show' ? timeout : 3000;
    },
  },
  actions: {
    handleToast(
      { commit },
      { type, message, timeout = 3000, action }: ToastState,
    ) {
      commit('setToast', {
        action,
        show: true,
        type,
        message,
        timeout,
      });
    },
  },
};

export default toast;
