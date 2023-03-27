<template>
  <button
    class="buttonWrapper"
    @click="handleClick"
    :class="[minimal && 'minimal', fullwidth && 'fullwidth']"
  >
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CustomButton',
  props: {
    minimal: {
      type: Boolean,
      default: false,
    },
    fullwidth: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick() {
      this.$emit('click');
    },
  },
});
</script>

<style lang="scss">
@import './styles';
</style>
