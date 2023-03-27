<template>
  <div class="userAvatarWrapper" v-if="!!user" data-cy="user-avatar">
    <img :src="user.photoURL" alt="user avatar" v-if="!!user.photoURL" />
    <span v-else>{{ initials }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { User } from 'firebase/auth';

export default Vue.extend({
  name: 'UserAvatar',
  props: {
    user: {
      type: Object as () => User,
      required: true,
    },
  },
  computed: {
    initials(): string {
      if (!this.user || !this.user.displayName) {
        return '';
      }

      const splitedName = this.user.displayName.split(' ');
      const firstName = splitedName[0];
      const lastName =
        splitedName.length > 1 ? splitedName[splitedName.length - 1] : '';
      return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
    },
  },
});
</script>

<style lang="scss">
@import './styles';
</style>
