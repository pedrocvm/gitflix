import { Module } from 'vuex';
import {
  User,
  updateProfile,
  updatePassword,
  updateEmail,
  getIdToken,
} from 'firebase/auth';
import { RootState } from '../types';

const userModule: Module<Record<string, unknown>, RootState> = {
  namespaced: true,

  state: {
    user: null,
  },

  getters: {
    getUser: (state) => state.user,
  },

  mutations: {
    setUser(state, payload: User | null) {
      state.user = payload;
    },
  },

  actions: {
    async updateUser(
      { commit, dispatch, getters },
      {
        displayName,
        email,
        password,
      }: {
        displayName?: string;
        email?: string;
        password?: string;
      },
    ) {
      const user: User | null = getters.getUser;
      if (!user) return;

      const updates = [
        {
          condition: !!password,
          action: async () => {
            await updatePassword(user, password!);
            await getIdToken(user, true);
            await dispatch(
              'toast/handleToast',
              {
                type: 'success',
                message: 'User updated successfully',
                action: 'show',
              },
              { root: true },
            );
          },
        },
        {
          condition: !!email,
          action: async () => {
            await updateEmail(user, email!);
            await getIdToken(user, true);
          },
        },
        {
          condition: !!displayName,
          action: () => updateProfile(user, { displayName: displayName! }),
        },
      ];

      await dispatch(
        'loading/handleLoading',
        { isLoading: true },
        { root: true },
      );

      try {
        await Promise.all(
          updates
            .filter(({ condition }) => condition)
            .map(({ action }) => action()),
        );

        commit('setUser', user);

        await dispatch(
          'toast/handleToast',
          {
            type: 'success',
            message: 'User updated successfully',
            action: 'show',
          },
          { root: true },
        );
      } catch (error) {
        await dispatch(
          'toast/handleToast',
          {
            type: 'error',
            message: (error as Error).message,
            action: 'show',
          },
          { root: true },
        );
      } finally {
        await dispatch(
          'loading/handleLoading',
          { isLoading: false },
          { root: true },
        );
      }
    },
  },
};

export default userModule;
