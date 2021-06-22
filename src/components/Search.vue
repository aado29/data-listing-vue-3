<template>
  <div class="search">
    <form action="#" @submit="handleSearch" class="search__inner search__inner--between">
      <div class="search__col">
        <div class="search__inner">
          <div class="search__col">
            <textfield
              label="Nombre" name="name" placeholder="Morty" v-model="searchName" />
          </div>
          <div class="search__col">
            <select-ui
              label="Estado" name="status" v-model="statusSelected" :options="statusList" />
          </div>
          <div class="search__col">
            <select-ui
              label="Género" name="gender" v-model="genderSelected" :options="genderList" />
          </div>
        </div>
      </div>
      <div class="search__col">
        <button type="submit" class="search__button">
          Buscar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import SelectUi from '@/components/SelectUi.vue';
import Textfield from '@/components/Textfield.vue';

export default {
  name: 'Search',

  components: {
    SelectUi,
    Textfield,
  },

  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const searchName = ref(route.query.name || '');
    const statusSelected = ref(route.query.status || '');
    const genderSelected = ref(route.query.gender || '');
    const statusList = ref([
      { name: 'vivo', value: 'alive' },
      { name: 'muerto', value: 'dead' },
      { name: 'desconocido', value: 'unknown' },
    ]);
    const genderList = ref([
      { name: 'femenino', value: 'female' },
      { name: 'masculino', value: 'male' },
      { name: 'Sin genero', value: 'genderless' },
      { name: 'desconocido', value: 'unknown' },
    ]);

    function handleSearch(e) {
      e.preventDefault();

      const query = {};
      if (searchName.value) query.name = searchName.value;
      if (statusSelected.value) query.status = statusSelected.value;
      if (genderSelected.value) query.gender = genderSelected.value;

      router.replace({ query });
      store.dispatch('getCharacters', query);
    }

    return {
      searchName,
      handleSearch,
      statusList,
      statusSelected,
      genderList,
      genderSelected,
    };
  },
};
</script>

<style lang="scss">
.search {
  margin-top: 32px;
  padding: 12px 16px;
  background-color: white;
  margin-bottom: 32px;
  border-radius: 16px;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -2px rgba(0,0,0,.05);

  &__inner {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    margin: 0 -4px;

    &--between {
      justify-content: space-between;
    }
  }

  &__col {
    padding: 0 4px;
    min-width: 200px;

    .textfield,
    .select-ui {
      margin: 8px 0;
    }
  }

  &__button {
    display: block;
    width: 100%;
    text-align: center;
    appearance: none;
    border: 1px solid #4a5568;
    font-size: 24px;
    padding: 8px 32px;
    background-color: #4a5568;
    color: white;
    border-radius: 8px;
    transition: all 0.25s ease-out;
    cursor: pointer;
    margin: 8px 0;

    &:hover {
      color: #4a5568;
      background-color: white;
    }
  }
}
</style>
