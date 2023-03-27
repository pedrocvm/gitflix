import { mount } from '@vue/test-utils';
import Dropdown from '@/components/ui/Dropdown/Dropdown.vue';

describe('Dropdown.vue', () => {
  it('renders the toggle and content slots correctly', async () => {
    const wrapper = mount(Dropdown, {
      slots: {
        toggle: '<span>Toggle</span>',
        content: '<div class="dropdown-item">Content</div>',
      },
    });

    const dropdownContent = wrapper.find('.dropdown-content');

    expect(wrapper.html()).toContain('<span>Toggle</span>');
    expect((dropdownContent.element as HTMLElement).style.display).toBe('none');

    await wrapper.trigger('click');
    await wrapper.vm.$nextTick();
    expect((dropdownContent.element as HTMLElement).style.display).not.toBe(
      'none',
    );
  });

  it('toggles the dropdown on click', async () => {
    const wrapper = mount(Dropdown, {
      slots: {
        toggle: '<span>Toggle</span>',
        content: '<div class="dropdown-item">Content</div>',
      },
    });

    await wrapper.trigger('click');
    expect(wrapper.vm.$data.isOpen).toBe(true);

    await wrapper.trigger('click');
    expect(wrapper.vm.$data.isOpen).toBe(false);
  });

  it('closes the dropdown when clicking outside', async () => {
    const wrapper = mount(Dropdown, {
      slots: {
        toggle: '<span>Toggle</span>',
        content: '<div class="dropdown-item">Content</div>',
      },
    });

    await wrapper.trigger('click');
    expect(wrapper.vm.$data.isOpen).toBe(true);

    await document.body.click();
    expect(wrapper.vm.$data.isOpen).toBe(false);
  });
});
