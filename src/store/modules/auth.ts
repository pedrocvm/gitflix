import { Module } from 'vuex';
import { auth } from '@/plugins/firebase.config';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  browserLocalPersistence,
  setPersistence,
} from 'firebase/auth';
import { RootState } from '../types';

setPersistence(auth, browserLocalPersistence);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const authModule: Module<Record<string, unknown>, RootState> = {
  namespaced: true,

  actions: {
    async handleAuthResult({ commit, dispatch }, authResult) {
      const { user, error } = authResult;
      commit('user/setUser', user, { root: true });

      if (error) {
        await dispatch(
          'toast/handleToast',
          {
            type: 'error',
            message: error.message,
            action: 'show',
          },
          { root: true },
        );
      } else {
        await dispatch(
          'toast/handleToast',
          {
            type: 'success',
            message: user ? 'Login successful' : 'Logout successful',
            action: 'show',
          },
          { root: true },
        );
      }
    },

    async signUpWithEmail({ dispatch }, { displayName, email, password }) {
      await dispatch(
        'loading/handleLoading',
        {
          isLoading: true,
        },
        { root: true },
      );

      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );

        await dispatch('handleAuthResult', {
          user,
          error: null,
        });

        if (!!user) {
          await updateProfile(user, { displayName });
        }
      } catch (error) {
        await dispatch('handleAuthResult', { user: null, error });
      } finally {
        await dispatch(
          'loading/handleLoading',
          {
            isLoading: false,
          },
          { root: true },
        );
      }
    },

    async processLogin({ dispatch }, loginFn) {
      await dispatch(
        'loading/handleLoading',
        { isLoading: true },
        { root: true },
      );

      try {
        const { user } = await loginFn();

        if (!!user) {
          user.providerData.forEach((profile: any) => {
            console.log(profile.photoURL);
          });

          if (!user.displayName) {
            await updateProfile(user, {
              displayName: user.reloadUserInfo.screenName,
            });
          }

          await dispatch('handleAuthResult', {
            user,
            error: null,
          });
        }
      } catch (error) {
        await dispatch('handleAuthResult', { user: null, error });
      } finally {
        await dispatch(
          'loading/handleLoading',
          { isLoading: false },
          { root: true },
        );
      }
    },

    async loginWithEmail({ dispatch }, { email, password }) {
      await dispatch('processLogin', () =>
        signInWithEmailAndPassword(auth, email, password),
      );
    },

    async loginWithGoogle({ dispatch }) {
      await dispatch('processLogin', () =>
        signInWithPopup(auth, googleProvider),
      );
    },

    async loginWithGithub({ dispatch }) {
      await dispatch('processLogin', () =>
        signInWithPopup(auth, githubProvider),
      );
    },

    async resetPassword({ commit, dispatch }, email) {
      try {
        await sendPasswordResetEmail(auth, email);
        commit('setError', null);

        await dispatch(
          'toast/handleToast',
          {
            type: 'success',
            message: 'Email sent successfully',
            action: 'show',
          },
          { root: true },
        );
      } catch (error) {
        commit('setError', (error as Error).message);
        await dispatch(
          'toast/handleToast',
          {
            type: 'error',
            message: (error as Error).message,
            action: 'show',
          },
          { root: true },
        );
      }
    },

    async logout({ dispatch }) {
      await dispatch(
        'loading/handleLoading',
        {
          isLoading: true,
        },
        { root: true },
      );

      try {
        await signOut(auth);
        await dispatch('handleAuthResult', { user: null, error: null });
      } catch (error) {
        await dispatch('handleAuthResult', { user: null, error });
      } finally {
        setTimeout(async () => {
          await dispatch(
            'loading/handleLoading',
            {
              isLoading: false,
            },
            { root: true },
          );
        }, 300);
      }
    },

    initAuth({ commit }) {
      return new Promise<void>((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            commit('user/setUser', user, { root: true });
          } else {
            commit('user/setUser', null, { root: true });
          }
          unsubscribe();
          resolve();
        });
      });
    },
  },
};

export default authModule;
