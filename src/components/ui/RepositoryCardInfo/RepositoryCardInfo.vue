<template>
  <div class="repositoryCardInfoWrapper">
    <Icon :icon="icon" size="medium" />
    <span>{{ text }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Icon from '@/components/generics/Icon/Icon.vue';

export default Vue.extend({
  name: 'RepositoryCardInfo',
  components: {
    Icon,
  },
  props: {
    text: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss">
@import './styles';
</style>
