// Icon.spec.ts
import { shallowMount } from '@vue/test-utils';
import Icon from '@/components/generics/Icon/Icon.vue';

describe('Icon.vue', () => {
  it('renders the correct icon class', () => {
    const icon = 'check';
    const wrapper = shallowMount(Icon, {
      propsData: {
        icon,
      },
    });

    expect(wrapper.find('i').classes()).toContain(`pi-${icon}`);
  });

  it('renders the correct size class', () => {
    const size = 'large';
    const wrapper = shallowMount(Icon, {
      propsData: {
        icon: 'check',
        size,
      },
    });

    expect(wrapper.find('i').classes()).toContain(size);
  });

  it('renders the default size class when no size prop is provided', () => {
    const defaultSize = 'medium';
    const wrapper = shallowMount(Icon, {
      propsData: {
        icon: 'check',
      },
    });

    expect(wrapper.find('i').classes()).toContain(defaultSize);
  });

  it('sets the aria-label attribute correctly', () => {
    const icon = 'check';
    const wrapper = shallowMount(Icon, {
      propsData: {
        icon,
      },
    });

    expect(wrapper.attributes('aria-label')).toBe(`${icon} icon`);
  });
});
