import { shallowMount } from '@vue/test-utils';
import RepositoryCardInfo from '@/components/ui/RepositoryCardInfo/RepositoryCardInfo.vue';

describe('RepositoryCardInfo.vue', () => {
  const icon = 'circle-fill';
  const text = 'Sample text';

  const wrapper = shallowMount(RepositoryCardInfo, {
    propsData: { icon, text },
  });

  it('renders the Icon component with the correct props', () => {
    const iconComponent = wrapper.find('icon-stub');
    expect(iconComponent.exists()).toBeTruthy();
    expect(iconComponent.props().icon).toBe(icon);
    expect(iconComponent.props().size).toBe('medium');
  });

  it('displays the correct text', () => {
    const span = wrapper.find('span');
    expect(span.exists()).toBeTruthy();
    expect(span.text()).toBe(text);
  });
});
