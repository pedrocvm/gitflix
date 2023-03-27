import { shallowMount, Wrapper } from '@vue/test-utils';
import { User } from 'firebase/auth';
import UserAvatar from '@/components/ui/UserAvatar/UserAvatar.vue';

describe('UserAvatar.vue', () => {
  let wrapper: Wrapper<InstanceType<typeof UserAvatar>>;
  const user: User = {
    displayName: 'John Doe',
    photoURL: 'https://example.com/avatar.jpg',
    // outras propriedades do usuário não são necessárias para os testes
  } as User;

  beforeEach(() => {
    wrapper = shallowMount(UserAvatar, {
      propsData: {
        user,
      },
    });
  });

  it('renders the UserAvatar component', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders the user avatar image when photoURL is provided', () => {
    const avatarImage = wrapper.find('img');
    expect(avatarImage.exists()).toBeTruthy();
    expect(avatarImage.attributes('src')).toBe(user.photoURL);
  });

  it('renders the user initials when photoURL is not provided', async () => {
    const userWithoutPhoto = {
      ...user,
      photoURL: null,
    };

    wrapper.setProps({ user: userWithoutPhoto });
    await wrapper.vm.$nextTick();

    const avatarInitials = wrapper.find('span');
    expect(avatarInitials.exists()).toBeTruthy();
    expect(avatarInitials.text()).toBe('JD');
  });
});
