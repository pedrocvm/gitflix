import { Module } from 'vuex';
import RepositoryService from '@/services/repository';
import { auth } from '@/plugins/firebase.config';
import { RootState, RepositoriesState, Repository, Bookmark } from '../types';

const addIsBookmarkProperty = (repos: Repository[]): Repository[] =>
  repos.map((repo) => ({ ...repo, isBookmark: false }));

const repositories: Module<RepositoriesState, RootState> = {
  namespaced: true,
  state: {
    popularRepos: [],
    userRepos: [],
    bookmarks: [],
  },
  getters: {
    popularRepos: (state) => state.popularRepos,
    userRepos: (state) => state.userRepos,
    bookmarks: (state) => state.bookmarks,
  },

  mutations: {
    setPopularRepos(state, repos: Repository[]) {
      state.popularRepos = repos;
    },

    setUserRepos(state, repos: Repository[]) {
      state.userRepos = repos;
    },

    setBookmarks(state, bookmarks: Bookmark[]) {
      state.bookmarks = bookmarks;
    },

    setBookmark(state, bookmark: Bookmark) {
      const index = state.popularRepos.findIndex(
        (repo) => repo.id === bookmark.id,
      );

      if (index !== -1) {
        state.popularRepos[index].isBookmark =
          !state.popularRepos[index].isBookmark;
      }
    },
  },

  actions: {
    async fetchPopularRepos({ commit, dispatch }, language: string) {
      await dispatch(
        'loading/handleLoading',
        {
          isLoading: true,
        },
        { root: true },
      );

      try {
        const repos = await RepositoryService.getPopularRepos(language);
        commit('setPopularRepos', addIsBookmarkProperty(repos));
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
          {
            isLoading: false,
          },
          { root: true },
        );
      }
    },

    async fetchUserRepos({ commit, dispatch }, username: string) {
      await dispatch(
        'loading/handleLoading',
        {
          isLoading: true,
        },
        { root: true },
      );

      try {
        const repos = await RepositoryService.getUserRepos(username);
        commit('setUserRepos', addIsBookmarkProperty(repos));
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
          {
            isLoading: false,
          },
          { root: true },
        );
      }
    },

    async fetchBookmarks({ commit, dispatch }) {
      try {
        if (auth.currentUser) {
          console.log(auth.currentUser);
          const bookmarks = await RepositoryService.fetchBookmarks(
            auth.currentUser.uid,
          );

          commit('setBookmarks', bookmarks);
        }
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
      }
    },

    async toggleBookmark({ commit, dispatch }, { repository, action }) {
      if (auth.currentUser) {
        if (action === 'save') {
          await RepositoryService.saveBookmark(
            auth.currentUser.uid,
            repository,
          );
          await dispatch(
            'toast/handleToast',
            {
              type: 'success',
              message: 'Repository marked as bookmark',
              action: 'show',
            },
            { root: true },
          );
        } else {
          await RepositoryService.removeBookmark(
            auth.currentUser.uid,
            repository.id,
          );
          await dispatch(
            'toast/handleToast',
            {
              type: 'success',
              message: 'Repository unmarked as bookmark',
              action: 'show',
            },
            { root: true },
          );
        }

        commit('setBookmark', repository);
        dispatch('fetchBookmarks');
      }
    },
  },
};

export default repositories;
