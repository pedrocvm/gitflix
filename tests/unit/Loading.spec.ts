// Loading.spec.ts
import { shallowMount } from '@vue/test-utils';
import Loading from '@/components/structure/Loading/Loading.vue';

describe('Loading.vue', () => {
  it('renders the spinner SVG correctly', () => {
    const wrapper = shallowMount(Loading);

    const svg = wrapper.find('.spinner-svg');
    expect(svg.exists()).toBe(true);

    const circle = svg.find('circle');
    expect(circle.exists()).toBe(true);
  });

  it('applies the correct attributes to the spinner SVG and circle', () => {
    const wrapper = shallowMount(Loading);

    const svg = wrapper.find('.spinner-svg');
    expect(svg.attributes('viewBox')).toBe('0 0 100 100');
    expect(svg.attributes('preserveAspectRatio')).toBe('xMidYMid');

    const circle = svg.find('circle');
    expect(circle.attributes('cx')).toBe('50');
    expect(circle.attributes('cy')).toBe('50');
    expect(circle.attributes('fill')).toBe('none');
    expect(circle.attributes('stroke')).toBe('#ffffff');
    expect(circle.attributes('stroke-width')).toBe('8');
    expect(circle.attributes('r')).toBe('40');
    expect(circle.attributes('stroke-dasharray')).toBe(
      '188.4955592153876 64.83185307179586',
    );
    expect(circle.attributes('transform')).toBe('rotate(266.29 50 50)');
  });

  it('has the correct animateTransform element and attributes', () => {
    const wrapper = shallowMount(Loading);

    const animateTransform = wrapper.find('animateTransform');
    expect(animateTransform.exists()).toBe(true);

    expect(animateTransform.attributes('attributeName')).toBe('transform');
    expect(animateTransform.attributes('type')).toBe('rotate');
    expect(animateTransform.attributes('repeatCount')).toBe('indefinite');
    expect(animateTransform.attributes('dur')).toBe('1s');
    expect(animateTransform.attributes('values')).toBe('0 50 50;360 50 50');
    expect(animateTransform.attributes('keyTimes')).toBe('0;1');
  });
});
