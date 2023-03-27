<template>
  <div class="iconWrapper" :aria-label="`${icon} icon`">
    <i class="pi" :class="[`pi-${icon}`, size]" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CustomIcon',
  props: {
    icon: {
      type: String,
      required: true,
    },
    size: {
      type: String as () => 'small' | 'medium' | 'large',
      default: 'medium',
    },
  },
});
</script>

<style lang="scss">
@import './styles';
</style>
