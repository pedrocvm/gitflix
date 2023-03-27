import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import RepositoryCard from '@/components/ui/RepositoryCard/RepositoryCard.vue';
import { Repository } from '@/store/types';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('RepositoryCard.vue', () => {
  let store: Store<any>;
  let getters: any;
  let actions: any;
  let repository: Repository;

  beforeEach(() => {
    repository = {
      id: 1,
      name: 'test-repo',
      language: 'JavaScript',
      forks_count: 10,
      open_issues_count: 5,
      stargazers_count: 15,
      watchers_count: 20,
      html_url: 'https://github.com/test-user/test-repo',
      owner: {
        login: 'test-user',
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        html_url: 'https://github.com/test-user',
      },
      isBookmark: false,
    };

    getters = {
      bookmarks: () => [],
    };

    actions = {
      toggleBookmark: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        repositories: {
          namespaced: true,
          getters,
          actions,
        },
      },
    });
  });

  it('renders the repository card with correct information', () => {
    const wrapper = shallowMount(RepositoryCard, {
      store,
      localVue,
      propsData: { repository },
    });

    expect(wrapper.find('.cardHeader').text()).toContain(repository.name);
    expect(wrapper.find('.repository-card__link').attributes().href).toBe(
      repository.html_url,
    );
    expect(wrapper.find('.repository-card__avatar').attributes().src).toBe(
      repository.owner.avatar_url,
    );
  });
});
