<template>
  <div class="navMenuWrapper" v-if="!!getUser">
    <div class="navItemsWrapper">
      <router-link exact to="/">Discovery</router-link>
      <router-link
        exact
        to="/my-repositories"
        v-if="getUser.providerData[0].providerId.includes('github')"
        >My Repositories</router-link
      >
    </div>

    <div class="actionWrapper">
      <span data-cy="greetings-message">Welcome {{ getUser.displayName }}</span>
      <Dropdown>
        <template #toggle>
          <Button minimal :title="getUser.displayName">
            <UserAvatar :user="getUser" />
          </Button>
        </template>

        <template #content>
          <router-link
            exact
            :to="`/profile`"
            aria-label="link to my account page"
          >
            <Icon icon="user" />My Account</router-link
          >

          <Button
            minimal
            @click="logout"
            aria-label="logout button"
            data-cy="logout-button"
          >
            <Icon icon="sign-out" />Logout
          </Button>
        </template>
      </Dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import Button from '@/components/generics/Button/Button.vue';
import Icon from '@/components/generics/Icon/Icon.vue';
import UserAvatar from '@/components/ui/UserAvatar/UserAvatar.vue';
import Dropdown from '@/components/ui/Dropdown/Dropdown.vue';

export default Vue.extend({
  name: 'NavMenu',
  components: {
    Button,
    Icon,
    UserAvatar,
    Dropdown,
  },

  methods: {
    ...mapActions('auth', ['logout']),
    async handleLogout() {
      try {
        await this.logout();
        this.$router.push('/auth');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    },
  },

  computed: {
    ...mapGetters('user', ['getUser']),
  },

  watch: {
    getUser(newUser) {
      if (!newUser) {
        this.$router.push('/auth');
      }
    },
  },
});
</script>

<style lang="scss">
@import './styles';
</style>
