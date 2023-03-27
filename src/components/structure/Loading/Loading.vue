<template>
  <div class="loadingWrapper">
    <div class="spinner">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        class="spinner-svg"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="#ffffff"
          stroke-width="8"
          r="40"
          stroke-dasharray="188.4955592153876 64.83185307179586"
          transform="rotate(266.29 50 50)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          ></animateTransform>
        </circle>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'LoadingSpinner',
});
</script>

<style lang="scss">
@import './styles';
</style>
