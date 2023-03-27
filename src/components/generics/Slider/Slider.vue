<template>
  <div class="sliderWrapper">
    <Button
      v-if="elementsAvailable"
      :disabled="isLeftArrowDisabled"
      minimal
      @click="moveLeft"
      class="arrowLeft"
    >
      <Icon icon="chevron-left" size="large" />
    </Button>

    <div ref="sliderContent" class="sliderContent">
      <slot></slot>
    </div>

    <Button
      v-if="elementsAvailable"
      :disabled="isRightArrowDisabled"
      minimal
      @click="moveRight"
      class="arrowRight"
    >
      <Icon icon="chevron-right" size="large" />
    </Button>
  </div>
</template>

<script>
import Vue from 'vue';
import Button from '@/components/generics/Button/Button.vue';
import Icon from '@/components/generics/Icon/Icon.vue';

export default Vue.extend({
  name: 'CustomSlider',
  components: {
    Button,
    Icon,
  },
  data() {
    return {
      scrollPosition: 0,
      elementsAvailable: false,
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.elementsAvailable = true;
    });
  },

  methods: {
    moveLeft() {
      this.scrollPosition -= this.slideWidth;
      this.$refs.sliderContent.scrollBy({
        left: -this.slideWidth,
        behavior: 'smooth',
      });
    },

    moveRight() {
      this.scrollPosition += this.slideWidth;
      this.$refs.sliderContent.scrollBy({
        left: this.slideWidth,
        behavior: 'smooth',
      });
    },
  },

  computed: {
    slideWidth() {
      const items = this.$refs.sliderContent.children;
      if (items.length) {
        return (
          items[0].offsetWidth * 2 +
          parseFloat(getComputedStyle(items[0]).marginRight)
        );
      }
      return 0;
    },

    isLeftArrowDisabled() {
      return this.scrollPosition <= 0;
    },

    isRightArrowDisabled() {
      const items = this.$refs.sliderContent.children;
      const maxScroll = (items.length - 2) * items[0].offsetWidth;
      return this.scrollPosition >= maxScroll;
    },
  },
});
</script>

<style lang="scss">
@import './styles';
</style>
