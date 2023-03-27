import { User } from 'firebase/auth';

export interface ToastState {
  visible: boolean;
  type?: 'success' | 'error';
  message: string;
  timeout?: number;
  action: 'show' | 'close';
}

export interface LoadingState {
  isLoading: boolean;
}

export interface RepositoryOwner {
  avatar_url: string;
  html_url: string;
  login: string;
}

export interface Repository {
  id: number;
  name: string;
  owner: RepositoryOwner;
  forks_count: number;
  open_issues_count: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  html_url: string;
  isBookmark: boolean;
}

export interface Bookmark extends Repository {
  userId: string;
}

export interface RepositoriesState {
  popularRepos: Repository[];
  userRepos: Repository[];
  bookmarks: Bookmark[];
}

export interface RootState {
  toast: ToastState;
  loading: LoadingState;
  user: User | null;
}

export const initialRootState: RootState = {
  toast: {
    visible: false,
    type: 'success',
    message: '',
    timeout: 3000,
    action: 'show',
  },
  loading: {
    isLoading: false,
  },
  user: null,
};
