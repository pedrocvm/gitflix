// Heading.spec.ts
import { shallowMount } from '@vue/test-utils';
import Heading from '@/components/ui/Heading/Heading.vue';

describe('Heading.vue', () => {
  it('renders the content of the default slot', () => {
    const slotContent = '<h1>Test Heading</h1>';
    const wrapper = shallowMount(Heading, {
      slots: {
        default: slotContent,
      },
    });

    expect(wrapper.html()).toContain(slotContent);
  });
});
