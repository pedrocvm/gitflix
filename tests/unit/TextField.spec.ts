import { shallowMount, Wrapper } from '@vue/test-utils';
import TextField from '@/components/generics/TextField/TextField.vue';

describe('TextField.vue', () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = shallowMount(TextField, {
      propsData: {
        id: 'testId',
        label: 'Test Label',
      },
    });
  });

  it('should render input and label elements', () => {
    const label = wrapper.find('label');
    const input = wrapper.find('input');

    expect(label.exists()).toBeTruthy();
    expect(input.exists()).toBeTruthy();
  });

  it('should emit input event with updated value', async () => {
    const input = wrapper.find('input');

    input.setValue('test');
    await input.trigger('input');

    expect(wrapper.emitted('input')).toBeTruthy();
    expect(wrapper.emitted('input')![0]).toEqual(['test']);
  });
});
