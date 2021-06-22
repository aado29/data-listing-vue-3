<template>
  <div class="characters-grid">
    <div class="characters-grid__row">
      <div
        v-for="character in characters"
        :key="character.id"
        class="characters-grid__col"
      >
        <character-card :character="character" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import CharacterCard from '@/components/CharacterCard.vue';

export default {
  components: {
    CharacterCard,
  },

  setup() {
    const store = useStore();

    const characters = computed(() => store.state.characters);

    return {
      characters,
    };
  },
};
</script>

<style lang="scss">
.characters-grid {
  &__row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -8px;
  }

  &__col {
    width: 100%;
    padding: 0 8px 16px;

    @media (min-width: 991px) {
      width: 50%;
    }

    @media (min-width: 1200px) {
      width: 33.3333%;
    }
  }
}
</style>
