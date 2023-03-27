<template>
  <div id="app">
    <Header />
    <div class="content">
      <router-view />
    </div>
    <Footer />

    <ToastNotification v-if="!toastNotVisible" />
    <Loading v-if="getIsLoading" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '@/components/structure/Header/Header.vue';
import Footer from '@/components/structure/Footer/Footer.vue';
import ToastNotification from '@/components/structure/ToastNotification/ToastNotification.vue';
import Loading from '@/components/structure/Loading/Loading.vue';
import { mapGetters, mapState } from 'vuex';

export default Vue.extend({
  name: 'App',
  components: {
    Header,
    Footer,
    ToastNotification,
    Loading,
  },
  computed: {
    ...mapState('toast', ['toastNotVisible']),
    ...mapGetters('loading', ['getIsLoading']),
  },
});
</script>

<style lang="scss">
@import '@/sass/global';

#app {
  height: 100%;
  @include flexbox(column);
  background-color: $lightgray;
}

.content {
  flex-grow: 1;
  padding: $space-small $space-xxlarge;
}
</style>
