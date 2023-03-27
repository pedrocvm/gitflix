import { shallowMount } from '@vue/test-utils';
import AppFooter from '@/components/structure/Footer/Footer.vue';

describe('AppFooter.vue', () => {
  it('should renders created by text', () => {
    const wrapper = shallowMount(AppFooter);
    expect(wrapper.text()).toMatch('Created with ❤️ by');
  });

  it('should renders year', () => {
    const wrapper = shallowMount(AppFooter);
    const currentYear = new Date().getFullYear().toString();
    expect(wrapper.text()).toMatch(currentYear);
  });
});
