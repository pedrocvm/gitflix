// NavMenu.spec.ts
import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex, { ActionTree, GetterTree, Store } from 'vuex';
import NavMenu from '@/components/structure/NavMenu/NavMenu.vue';
import { RootState } from '@/store/types';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);

const router = new VueRouter();

describe('NavMenu.vue', () => {
  let store: Store<RootState>;
  let actions: ActionTree<RootState, RootState>;
  let getters: GetterTree<RootState, RootState>;

  beforeEach(() => {
    actions = {
      logout: jest.fn(),
    };

    getters = {
      getUser: () => ({
        displayName: 'Test User',
        providerData: [{ providerId: 'github.com' }],
      }),
    };

    store = new Vuex.Store<RootState>({
      modules: {
        auth: { namespaced: true, actions },
        user: { namespaced: true, getters },
      },
    });
  });

  it('renders the correct child components', async () => {
    const wrapper = shallowMount(NavMenu, { store, localVue, router });
    await wrapper.setData({
      getUser: { providerData: [{ providerId: 'github.com' }] },
    });

    const navItemsWrapper = wrapper.find('.navItemsWrapper');
    const dropdown = wrapper.find('dropdown-stub');
    const links = navItemsWrapper.findAll('router-link-stub');

    expect(dropdown.exists()).toBe(true);
    expect(links.length).toBe(2);
  });

  it('displays the user display name', () => {
    const wrapper = shallowMount(NavMenu, { store, localVue, router });
    expect(wrapper.text()).toContain('Welcome Test User');
  });

  it('renders the router-links with correct to attribute', () => {
    const wrapper = shallowMount(NavMenu, { store, localVue, router });

    const routerLinks = wrapper.findAll('router-link-stub');
    expect(routerLinks.at(0).attributes('to')).toBe('/');
    expect(routerLinks.at(1).attributes('to')).toBe('/my-repositories');
  });
});
