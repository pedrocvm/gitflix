<template>
  <div class="myRepositoriesWrapper">
    <section class="myRepositoriesSection" v-if="!!userRepos.length">
      <Heading> My Repositories </Heading>
      <Slider>
        <RepositoryCard
          v-for="repository in userRepos"
          :repository="repository"
          :key="repository.id"
        />
      </Slider>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import Slider from '@/components/generics/Slider/Slider.vue';
import Heading from '@/components/ui/Heading/Heading.vue';
import RepositoryCard from '@/components/ui/RepositoryCard/RepositoryCard.vue';

export default Vue.extend({
  name: 'MyRepositoryView',
  components: {
    Slider,
    Heading,
    RepositoryCard,
  },

  computed: {
    ...mapGetters('user', ['getUser']),
    ...mapGetters('repositories', ['userRepos']),
  },

  methods: {
    ...mapActions('repositories', ['fetchUserRepos']),
  },

  created() {
    this.fetchUserRepos(this.getUser.reloadUserInfo.screenName);
  },
});
</script>

<style lang="scss">
@import './styles';
</style>
