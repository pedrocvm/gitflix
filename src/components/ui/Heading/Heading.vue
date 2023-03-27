<template>
  <div class="headingWrapper" data-cy="heading-wrapper">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CustomHeading',
});
</script>

<style lang="scss">
@import './styles';
</style>
