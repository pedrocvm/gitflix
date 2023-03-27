<template>
  <div class="headerWrapper">
    <div class="logoWrapper">
      <router-link to="/">
        <img src="/img/logo.svg" alt="app logo" />
      </router-link>
    </div>

    <NavMenu />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NavMenu from '@/components/structure/NavMenu/NavMenu.vue';

export default Vue.extend({
  name: 'AppHeader',
  components: {
    NavMenu,
  },
});
</script>

<style lang="scss">
@import './styles';
</style>
