import { ref, set, remove, get } from 'firebase/database';
import { database } from '@/plugins/firebase.config';
import { Bookmark, Repository } from '../store/types';

const RepositoryService = {
  getPopularRepos: async (language: string) => {
    try {
      const response = await fetch(
        `${process.env.VUE_APP_BASE_URL}?q=language:${encodeURIComponent(
          language,
        )}&per_page=10&page=1&sort=stars`,
      );

      if (response.ok) {
        const data = await response.json();
        return data.items;
      }

      throw new Error('Error fetching repositories');
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getUserRepos: async (username: string) => {
    try {
      const response = await fetch(
        `${process.env.VUE_APP_BASE_SEARCH_URL}/${username}/repos?sort=created&direction=desc`,
      );

      if (response.ok) {
        const data = await response.json();
        return data;
      }

      throw new Error('Error fetching user repositories');
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async saveBookmark(userId: string, repository: Repository) {
    const repoRef = ref(database, `bookmarks/${userId}/${repository.id}`);
    await set(repoRef, repository);
  },

  async removeBookmark(userId: string, repositoryId: number) {
    const repoRef = ref(database, `bookmarks/${userId}/${repositoryId}`);
    await remove(repoRef);
  },

  async fetchBookmarks(userId: string): Promise<Bookmark[]> {
    const snapshot = await get(ref(database, `bookmarks/${userId}`));
    const data = snapshot.val() || {};
    return Object.values(data);
  },
};

export default RepositoryService;
