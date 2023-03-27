<template>
  <div class="homeWrapper" data-cy="home-page">
    <section class="bookmarkSection" v-if="!!bookmarks.length">
      <Heading>My Bookmarks</Heading>
      <Slider>
        <RepositoryCard
          v-for="repository in bookmarks"
          :repository="repository"
          :key="repository.id"
        />
      </Slider>
    </section>

    <section class="mostPopularSection">
      <div class="filterWrapper">
        <Heading>Most Popular - {{ selectedProgrammingLanguage }}</Heading>
        <Autocomplete
          data-cy="autocomplete-input"
          :value="selectedProgrammingLanguage"
          :items="programmingLanguages"
          @input="selectProgrammingLanguage"
        />
      </div>
      <Slider v-if="!!popularRepos.length">
        <RepositoryCard
          v-for="repository in popularRepos"
          :repository="repository"
          :key="repository.id"
        />
      </Slider>
      <span v-else>No repositories found</span>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import Slider from '@/components/generics/Slider/Slider.vue';
import Autocomplete from '@/components/generics/Autocomplete/Autocomplete.vue';
import RepositoryCard from '@/components/ui/RepositoryCard/RepositoryCard.vue';
import Heading from '@/components/ui/Heading/Heading.vue';
import mockProgrammingLanguages from '@/mocks/programmingLanguages';

export default Vue.extend({
  name: 'HomeView',
  components: {
    RepositoryCard,
    Slider,
    Autocomplete,
    Heading,
  },
  data() {
    return {
      selectedProgrammingLanguage: 'JavaScript',
      programmingLanguages: mockProgrammingLanguages,
    };
  },

  computed: {
    ...mapGetters('user', ['getUser']),
    ...mapGetters('repositories', ['bookmarks', 'popularRepos']),
  },
  methods: {
    ...mapActions('repositories', ['fetchPopularRepos', 'fetchBookmarks']),

    selectProgrammingLanguage(value: string) {
      this.selectedProgrammingLanguage = value;
    },
  },

  created() {
    this.fetchPopularRepos(this.selectedProgrammingLanguage);
    this.fetchBookmarks();
  },

  watch: {
    selectedProgrammingLanguage() {
      this.fetchPopularRepos(this.selectedProgrammingLanguage);
    },
  },
});
</script>

<style lang="scss">
@import './styles';
</style>
