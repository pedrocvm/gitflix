import { shallowMount } from '@vue/test-utils';
import Card from '@/components/generics/Card/Card.vue';

describe('Card.vue', () => {
  it('renders the card with the content of the default slot', () => {
    const wrapper = shallowMount(Card, {
      slots: {
        default: '<p>Card content</p>',
      },
    });

    expect(wrapper.html()).toContain('<div class="cardWrapper">');
    expect(wrapper.html()).toContain('<p>Card content</p>');
  });
});
