<template>
  <div
    class="autocompleteWrapper"
    ref="autocompleteWrapper"
    @mousedown="handleMouseDown"
  >
    <TextField
      id="autocompleteField"
      @input="handleInputChange"
      label="Seach by Programming Language"
      :value="selectedSuggestion"
    />

    <div
      v-if="!!searchText && suggestions.length > 0"
      class="suggestionsWrapper"
    >
      <div
        class="suggestionItem"
        v-for="suggestion in suggestions"
        :key="suggestion"
        @click="selectSuggestion(suggestion)"
        @keyup.enter="selectSuggestion(suggestion)"
        @keyup.space="selectSuggestion(suggestion)"
      >
        {{ suggestion }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import TextField from '@/components/generics/TextField/TextField.vue';

export default Vue.extend({
  name: 'CustomAutocomplete',
  components: {
    TextField,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    items: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  data() {
    return {
      searchText: '',
      suggestions: [] as string[],
      selectedSuggestion: this.value,
    };
  },
  mounted() {
    document.addEventListener('mousedown', this.handleMouseDown);
  },
  beforeDestroy() {
    document.removeEventListener('mousedown', this.handleMouseDown);
  },
  methods: {
    handleInputChange(value: string) {
      this.searchText = value;

      if (!!this.searchText) {
        this.suggestions = this.items.filter((item) =>
          item.toLowerCase().startsWith(this.searchText.toLowerCase()),
        );
      } else {
        this.suggestions = [];
        this.selectedSuggestion = '';
      }
    },

    selectSuggestion(suggestion: string) {
      this.selectedSuggestion = suggestion;
      this.suggestions = [];
      this.$emit('input', suggestion);
    },

    handleMouseDown(event: MouseEvent) {
      const target = event.target as HTMLElement;
      const wrapper = this.$refs.autocompleteWrapper as HTMLElement;

      if (!wrapper.contains(target)) {
        this.suggestions = [];
      }
    },
  },
});
</script>

<style lang="scss">
@import './styles';
</style>
