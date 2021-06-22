<template>
  <div class="select-ui">
    <label
      v-if="label"
      :for="id"
      class="select-ui__label"
    >
      {{ label }}
    </label>
    <select
      :id="id"
      :name="name"
      :value="modelValue"
      @input="handleChange"
      class="select-ui__input"
    >
      <option value="">Seleccionar</option>
      <option
        v-for="item in options"
        :key="item.key"
        :value="mapValue(item)"
      >
        {{ mapTitle(item) }}
      </option>
    </select>
  </div>
</template>

<script>
import { computed, getCurrentInstance } from 'vue';

export default {
  name: 'SelectUi',

  props: {
    modelValue: {
      type: [String, Number, Object],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    mapTitle: {
      type: Function,
      default: (item) => item.name,
    },
    mapValue: {
      type: Function,
      default: (item) => item.value,
    },
  },

  setup() {
    const self = getCurrentInstance();
    const id = computed(() => `select-ui-${self.uid}`);

    function handleChange(e) {
      const value = e.target?.value;
      self.emit('update:modelValue', value);
    }

    return {
      id,
      handleChange,
    };
  },
};
</script>

<style lang="scss">
.select-ui {
  display: block;
  width: 100%;

  &__label {
    display: block;
  }

  &__input {
    display: block;
    width: 100%;
    padding: 4px 8px;
    border: 1px solid #4a5568;
    background-color: white;
    color: #4a5568;
    font-size: 16px;
    height: 28px;
  }
}
</style>
