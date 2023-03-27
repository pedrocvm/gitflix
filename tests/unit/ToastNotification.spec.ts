import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import ToastNotification from '@/components/structure/ToastNotification/ToastNotification.vue';

describe('ToastNotification.vue', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  let store: Store<any>;
  let toastModule: any;

  beforeEach(() => {
    toastModule = {
      namespaced: true,
      state: {
        type: 'success',
        message: 'Test message',
        timeout: 3000,
        visible: true,
      },
      actions: {
        handleToast: jest.fn(),
      },
    };

    store = new Vuex.Store({
      modules: {
        toast: toastModule,
      },
    });
  });

  it('renders the ToastNotification component', () => {
    const wrapper = shallowMount(ToastNotification, { store, localVue });
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders the correct message', () => {
    const wrapper = shallowMount(ToastNotification, { store, localVue });
    expect(wrapper.find('.message').text()).toBe('Test message');
  });

  it('applies the correct type class', () => {
    const wrapper = shallowMount(ToastNotification, { store, localVue });
    expect(wrapper.find('.toastNotificationWrapper').classes()).toContain(
      'toast-success',
    );
  });

  it('applies the correct progress bar class and style', () => {
    const wrapper = shallowMount(ToastNotification, { store, localVue });
    const progressBar = wrapper.find('.progressBar');

    expect(progressBar.classes()).toContain('progressBar-success');
    expect(progressBar.attributes('style')).toContain('width: 100%');
  });
});
