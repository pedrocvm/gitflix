<template>
  <div class="textFieldWrapper" :class="{ active: isActive || hasValue }">
    <label :for="id">
      <span class="labelText">{{ label }}</span>

      <input
        :id="id"
        :type="type === 'password' && isPasswordVisible ? 'text' : type"
        :class="{ inputPassword: type === 'password' }"
        :value="value"
        :required="required"
        :disabled="disabled"
        ref="textfieldRef"
        autocomplete="off"
        @focus="isActive = true"
        @blur="isActive = false"
        @input="handleInputChange($event.target.value)"
      />

      <Button
        minimal
        type="button"
        v-if="type === 'password'"
        @click="togglePasswordVisibility"
      >
        <Icon :icon="isPasswordVisible ? 'eye-slash' : 'eye'" />
      </Button>
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Icon from '@/components/generics/Icon/Icon.vue';
import Button from '@/components/generics/Button/Button.vue';

export default Vue.extend({
  name: 'TextField',
  components: {
    Icon,
    Button,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isActive: false,
      hasValue: !!this.value,
      isPasswordVisible: false,
    };
  },

  methods: {
    handleInputChange(value: string) {
      this.hasValue = !!value;
      this.$emit('input', value);
    },

    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
  },

  watch: {
    value() {
      this.hasValue = !!this.value;
    },
  },
});
</script>

<style lang="scss">
@import './styles';
</style>
