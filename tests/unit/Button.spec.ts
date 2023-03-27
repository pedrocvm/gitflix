import { shallowMount } from '@vue/test-utils';
import Button from '@/components/generics/Button/Button.vue';

describe('Button.vue', () => {
  it('renders the default button correctly', () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: 'Click me',
      },
    });

    expect(wrapper.text()).toMatch('Click me');
    expect(wrapper.classes()).not.toContain('minimal');
    expect(wrapper.classes()).not.toContain('fullwidth');
  });

  it('renders a minimal button when the minimal prop is set', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        minimal: true,
      },
      slots: {
        default: 'Click me',
      },
    });

    expect(wrapper.classes()).toContain('minimal');
  });

  it('renders a fullwidth button when the fullwidth prop is set', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        fullwidth: true,
      },
      slots: {
        default: 'Click me',
      },
    });

    expect(wrapper.classes()).toContain('fullwidth');
  });

  it('emits a click event when the button is clicked', async () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: 'Click me',
      },
    });

    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });
});
