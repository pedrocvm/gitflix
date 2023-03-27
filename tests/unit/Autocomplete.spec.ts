import { mount, shallowMount } from '@vue/test-utils';
import Autocomplete from '@/components/generics/Autocomplete/Autocomplete.vue';
import TextField from '@/components/generics/TextField/TextField.vue';

describe('Autocomplete.vue', () => {
  const items = ['Python', 'JavaScript', 'Ruby'];
  it('renders the component correctly', () => {
    const wrapper = mount(Autocomplete, {
      propsData: {},
    });

    expect(wrapper.text()).toMatch(/Seach by Programming Language/i);
  });

  it('updates suggestions when input changes', () => {
    const wrapper = shallowMount(Autocomplete, {
      propsData: {
        items,
      },
    });

    const textField = wrapper.findComponent(TextField);
    textField.vm.$emit('input', 'Py');

    expect(wrapper.vm.$data.suggestions).toEqual(['Python']);
  });

  it('hides suggestions when mousedown event is triggered outside the component', async () => {
    const wrapper = shallowMount(Autocomplete, {
      propsData: {
        items,
      },
    });

    const textField = wrapper.findComponent(TextField);
    textField.vm.$emit('input', 'Py');

    expect(wrapper.vm.$data.suggestions).toEqual(['Python']);

    const event = new MouseEvent('mousedown');
    document.dispatchEvent(event);

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$data.suggestions).toEqual([]);
  });
});
