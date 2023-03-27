<template>
  <transition name="fade">
    <div class="toastNotificationWrapper" :class="typeClass" v-if="visible">
      <div class="message">{{ message }}</div>
      <div
        class="progressBar"
        :class="progressBarClass"
        :style="progressBarStyle"
      ></div>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

export default Vue.extend({
  name: 'ToastNotification',
  computed: {
    ...mapState('toast', ['type', 'message', 'timeout', 'visible']),
    typeClass() {
      return `toast-${this.type}`;
    },
    progressBarClass() {
      return `progressBar-${this.type}`;
    },
    progressBarStyle() {
      return {
        width: `${this.localProgress}%`,
      };
    },
  },
  data() {
    return {
      localProgress: 100,
    };
  },
  methods: {
    ...mapActions('toast', ['handleToast']),
    startTimeout() {
      const interval = setInterval(() => {
        this.localProgress -= 100 / (this.timeout / 100);
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        this.handleToast({ action: 'close' });
      }, this.timeout);
    },
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.startTimeout();
        this.localProgress = 100;
      }
    },
  },
});
</script>

<style lang="scss">
@import './styles';
</style>
