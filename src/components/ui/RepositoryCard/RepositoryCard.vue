<template>
  <Card v-if="repository && repository.language">
    <div class="repositoryCardWrapper">
      <div class="cardHeader">
        {{ repository.name }}
        <Button minimal @click="handleBookmark" data-testid="bookmark-button">
          <Icon
            ref="starIcon"
            :class="{ bookmark: isBookmark }"
            :icon="isBookmark ? 'star-fill' : 'star'"
            size="large"
          />
        </Button>
      </div>

      <RepositoryCardInfo icon="circle-fill" :text="repository.language" />

      <div class="cardInfo">
        <RepositoryCardInfo
          icon="sitemap"
          :text="`${repository.forks_count} forks`"
        />
        <RepositoryCardInfo
          icon="exclamation-circle"
          :text="`${repository.open_issues_count} open issues`"
        />
        <RepositoryCardInfo
          icon="star"
          :text="`${repository.stargazers_count} stars`"
        />
        <RepositoryCardInfo
          icon="eye"
          :text="`${repository.watchers_count} watchers`"
        />
      </div>

      <div class="cardFooter">
        <a
          :href="repository.html_url"
          target="_blank"
          rel="noreferrer noopener"
          class="repository-card__link"
          >View on GitHub</a
        >
        <a
          :href="repository.owner.html_url"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img
            class="repository-card__avatar"
            :src="repository.owner.avatar_url"
            :alt="`${repository.owner.login} avatar`"
            :title="repository.owner.login"
          />
        </a>
      </div>
    </div>
  </Card>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import Card from '@/components/generics/Card/Card.vue';
import Icon from '@/components/generics/Icon/Icon.vue';
import Button from '@/components/generics/Button/Button.vue';
import RepositoryCardInfo from '@/components/ui/RepositoryCardInfo/RepositoryCardInfo.vue';

export default Vue.extend({
  name: 'RepositoryCard',
  components: {
    Card,
    Icon,
    Button,
    RepositoryCardInfo,
  },
  props: {
    repository: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('repositories', ['bookmarks']),
    isBookmark() {
      return this.bookmarks.find(({ id }) => this.repository.id === id);
    },
  },
  methods: {
    ...mapActions('repositories', ['toggleBookmark']),
    handleBookmark() {
      this.toggleBookmark({
        repository: this.repository,
        action: this.isBookmark ? 'delete' : 'save',
      });
    },
  },
});
</script>

<style scoped lang="scss">
@import './styles';
</style>
