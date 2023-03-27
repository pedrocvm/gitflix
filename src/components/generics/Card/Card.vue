<template>
  <div class="cardWrapper">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CustomCard',
});
</script>

<style lang="scss">
@import './styles';
</style>
