<!-- Dropdown.vue -->
<template>
  <div
    class="dropdownWrapper"
    @click.stop="toggleDropdown"
    @keydown.space.prevent.stop="toggleDropdown"
    @keydown.enter.prevent.stop="toggleDropdown"
    tabindex="0"
    ref="dropdown"
  >
    <slot name="toggle"></slot>

    <transition name="fade-translate">
      <div
        class="dropdown-content"
        v-show="isOpen"
        @click.stop
        ref="dropdownContent"
      >
        <slot id="dropdownContent" name="content"></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CustomDropdown',
  data() {
    return {
      isOpen: false,
      focusedIndex: -1,
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    closeDropdown() {
      this.isOpen = false;
      this.focusedIndex = -1;
    },
  },

  mounted() {
    document.addEventListener('click', this.closeDropdown);
    this.$nextTick(() => {
      const dropdownContent = this.$refs.dropdownContent as HTMLElement;
      Array.from(dropdownContent.children).forEach((child) => {
        child.addEventListener('click', this.closeDropdown);
      });
    });
  },

  beforeDestroy() {
    document.removeEventListener('click', this.closeDropdown);
    const dropdownContent = this.$refs.dropdownContent as HTMLElement;
    Array.from(dropdownContent.children).forEach((child) => {
      child.removeEventListener('click', this.closeDropdown);
    });
  },
});
</script>

<style lang="scss">
@import './styles';
</style>
