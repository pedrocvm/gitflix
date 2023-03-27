import { shallowMount } from '@vue/test-utils';
import Button from '@/components/generics/Button/Button.vue';
import Icon from '@/components/generics/Icon/Icon.vue';
import Slider from '@/components/generics/Slider/Slider.vue';

describe('Slider.vue', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(Slider, {
      slots: {
        default: '<div class="slide"></div><div class="slide"></div>',
      },
    });
  });

  it('renders the Slider component', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders the left and right arrow buttons', () => {
    const leftArrowButton = wrapper.findComponent(Button).find('.arrowLeft');
    const rightArrowButton = wrapper
      .findAllComponents(Button)
      .at(1)
      .find('.arrowRight');

    expect(leftArrowButton.exists()).toBeTruthy();
    expect(rightArrowButton.exists()).toBeTruthy();
  });

  it('renders the chevron icons for left and right arrow buttons', () => {
    const leftChevron = wrapper
      .findComponent(Icon)
      .find('[icon="chevron-left"]');
    const rightChevron = wrapper
      .findAllComponents(Icon)
      .at(1)
      .find('[icon="chevron-right"]');

    expect(leftChevron.exists()).toBeTruthy();
    expect(rightChevron.exists()).toBeTruthy();
  });
});
