<template>
  <div v-if="pagination" class="pagination">
    <div class="pagination__wrap">
      <div class="pagination__inner">
        <button
          type="button"
          class="pagination__button"
          :disabled="pagination.prev === null"
          @click="setPage(currentPage - 1)"
        >
          Anterior
        </button>
        <select
          name="pagination"
          v-model="currentPage"
          class="pagination__index"
          @change="handleChange"
        >
          <option :value="page" v-for="page of pagination.pages" :key="page">
            Página {{ page }} / {{ pagination.pages }}
          </option>
        </select>
        <button
          type="button"
          class="pagination__button"
          :disabled="pagination.next === null"
          @click="setPage(currentPage + 1)"
        >
          Siguiente
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const pagination = computed(() => store.state.pagination);

    const currentPage = computed(() => {
      if (!store.state.pagination || !store.state.pagination.next) {
        return store.state.pagination?.pages || null;
      }

      const params = store.state.pagination.next.split('?')[1].split('&').reduce((ob, param) => {
        const d = param.split('=');
        return { ...ob, [d[0]]: d[1] };
      }, {});

      return params.page ? params.page - 1 : 1;
    });

    function setPage(page) {
      const query = { ...store.state.query, page };
      router.push({ query });
      store.dispatch('getCharacters', query);
    }

    function handleChange(e) {
      const page = e.target?.value;
      setPage(page);
    }

    return {
      pagination,
      currentPage,
      setPage,
      handleChange,
    };
  },
};
</script>

<style lang="scss">
.pagination {
  padding: 16px 0 32px;

  &__wrap {
    display: flex;
    justify-content: center;
  }

  &__inner {
    display: flex;
  }

  &__index {
    appearance: none;
    border-radius: 0;
    text-align: center;
    padding: 0 16px;
    font-size: 16px;
    margin: 0 8px;

    &:focus {
      outline: none;
    }
  }

  &__button {
    appearance: none;
    border-radius: 0;
    border: 1px solid #4a5568;
    border-radius: 4px;
    background-color: white;
    padding: 4px 8px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.25s ease-out;

    &:hover {
      background-color: #4a5568;
      color: white;
    }

    &:disabled {
      background-color: #e0e0e0;
      border-color: #e0e0e0;
      color: #616161;
      cursor: not-allowed;
    }
  }
}
</style>
