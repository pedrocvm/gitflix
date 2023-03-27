// Header.spec.ts
import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import NavMenu from '@/components/structure/NavMenu/NavMenu.vue';
import Header from '@/components/structure/Header/Header.vue';

describe('Header.vue', () => {
  it('renders the logo and NavMenu', () => {
    const wrapper = shallowMount(Header, {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    expect(wrapper.find('.logoWrapper').exists()).toBe(true);
    expect(wrapper.find('.logoWrapper img').attributes('alt')).toBe('app logo');
    expect(wrapper.findComponent(NavMenu).exists()).toBe(true);
  });

  it('has a router-link to the root path', () => {
    const wrapper = shallowMount(Header, {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual('/');
  });
});
