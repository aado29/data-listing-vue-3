<template>
  <div class="character-card">
    <router-link :to="`/${character.id}`" class="character-card__thumbnail">
      <img
        class="character-card__thumbnail-image"
        :src="character.image"
        :alt="`image ${character.name}`"
      />
    </router-link>
    <div class="character-card__content">
      <p class="character-card__title">{{ character.name }}</p>
      <div class="character-card__info-container">
        <p class="character-card__info">
          <span> {{ character.gender }} </span>
          <span> {{ character.species }} </span>
          <span :class="[character.status.toLocaleLowerCase()]"> {{ character.status }} </span>
        </p>
        <router-link class="character-card__link" :to="`/${character.id}`">
          Más
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterCard',

  props: {
    character: {
      type: Object,
      default: null,
    },
  },

  setup() {
    // console.log(props.character);
  },
};
</script>

<style lang="scss">
  .character-card {
    display: flex;
    border-radius: 16px;
    height: 100%;
    max-height: 200px;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -2px rgba(0,0,0,.05);
    overflow: hidden;
    background-color: white;

    @media (min-width: 768px) {
      max-height: 300px;
    }

    @media (min-width: 992px) {
      max-height: 200px;
    }

    &__thumbnail {
      display: block;
      width: 100%;
      max-width: 200px;

      @media (min-width: 768px) {
        max-width: 300px;
      }

      @media (min-width: 992px) {
        max-width: 200px;
      }
    }

    &__thumbnail-image {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &__content {
      flex-grow: 1;
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      padding: 16px;
      text-transform: none;
    }

    &__title {
      margin: 0;
      font-size: 20px;
      margin-bottom: 8px;
      font-weight: 500;
    }

    &__info-container {
      display: flex;
      flex-flow: column;
    }

    &__info {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -4px 12px;

      span {
        display: block;
        font-size: 14px;
        margin: 4px;
        padding: 2px 8px;
        background-color: #edf2f7;
        font-weight: 600;
        border-radius: 12px;
        text-transform: capitalize;
        white-space: nowrap;

        &.alive,
        &.dead,
        &.unknown {
          color: #1A202C
        }

        &.alive {
          background-color: #9AE6B4;
        }

        &.dead {
          background-color: #FEB2B2;
        }

        &.unknown {
          background-color: #FEFCBF;
        }
      }
    }

    &__link {
      display: block;
      text-align: center;
      padding: 4px 16px;
      border: 1px solid #4a5568;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 500;
      color: #4a5568;
      transition: all 0.25s ease-out;

      &:hover {
        background-color: #4a5568;
        color: white;
      }
    }
  }
</style>
