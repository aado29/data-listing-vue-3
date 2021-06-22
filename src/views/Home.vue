<template>
  <div class="page page--home">
    <div class="page__container">
      <search />

      <div v-if="!isFetching">
        <div v-if="characters.length">
          <characters-grid />
        </div>
        <div v-else>
          <not-found />
        </div>
        <pagination />
      </div>

      <div v-else>
        <loading />
      </div>
    </div>

    <div v-if="showModal" class="page__modal-route"  @click="$router.back()">
      <div class="page__modal-content" @click="e => e.stopPropagation()">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ref, watch, computed, onMounted,
} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Search from '@/components/Search.vue';
import CharactersGrid from '@/components/CharactersGrid.vue';
import Pagination from '@/components/Pagination.vue';
import Loading from '@/components/Loading.vue';
import NotFound from '@/components/NotFound.vue';

export default {
  name: 'Home',

  components: {
    Search,
    CharactersGrid,
    Pagination,
    Loading,
    NotFound,
  },

  setup() {
    const route = useRoute();
    const showModal = ref(route.meta && route.meta.showModal);

    const store = useStore();

    onMounted(store.dispatch('getCharacters', route.query));

    const characters = computed(() => store.state.characters);
    const isFetching = computed(() => store.state.isFetching);

    watch(route, (value) => {
      showModal.value = value.meta && value.meta.showModal;
    });

    return {
      characters,
      isFetching,
      showModal,
    };
  },
};
</script>

<style lang="scss">
.page {
  &__container {
    width: 100%;
    max-width: 100%;
    padding: 0 16px;
    margin: 0 auto;

    @media (min-width: 576px) {
      max-width: 576px;
    }

    @media (min-width: 768px) {
      max-width: 720px;
    }

    @media (min-width: 992px) {
      max-width: 960px;
    }

    @media (min-width: 1200px) {
      max-width: 1140px;
    }

    @media (min-width: 1400px) {
      max-width: 1320px;
    }
  }

  &__modal-route {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }

  &__modal-content {
    width: 50%;
    max-height: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    overflow: auto;
    border-radius: 8px;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -2px rgba(0,0,0,.05);
  }
}
</style>
