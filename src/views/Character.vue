<template>
  <div class="character">
    <div v-if="isFetching">
      <loading />
    </div>
    <div v-if="character && !isFetching">
      <h3 class="character__title">
        {{character.name}}
      </h3>
      <p>Estado: <b>{{ character.status }}</b></p>
      <p>Género: <b>{{ character.gender }}</b></p>
      <p>Tipo: <b>{{ character.type }}</b></p>
      <p>Especie: <b>{{ character.species }}</b></p>
      <p>Origen: <b>{{ character.origin.name }}</b></p>
      <p>Visto por ultima vez: <b>{{ character.location.name }}</b></p>
      <p>Aparece en <b>{{ character.episode.length }} episodios</b></p>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Loading from '@/components/Loading.vue';

export default {
  components: {
    Loading,
  },

  setup() {
    const character = ref(null);
    const isFetching = ref(true);
    const route = useRoute();

    onMounted(() => {
      isFetching.value = true;
      fetch(`https://rickandmortyapi.com/api/character/${route.params.id}`)
        .then((res) => res.json())
        .then((data) => {
          character.value = data;
        })
        .finally(() => {
          isFetching.value = false;
        });
    });

    return {
      character,
      isFetching,
    };
  },
};
</script>

<style lang="scss">
.character {
  padding: 16px;

  &__title {
    font-size: 32px;
    margin-top: 0;
  }
}
</style>
