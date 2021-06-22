<template>
  <div class="textfield">
    <label
      v-if="label"
      :for="id"
      class="textfield__label"
    >
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :name="name"
      :value="modelValue"
      :placeholder="placeholder"
      class="textfield__input"
      @input="e => $emit('update:modelValue', e.target.value)"
    >
  </div>
</template>

<script>
import { computed, getCurrentInstance } from 'vue';

export default {
  name: 'Textfield',

  props: {
    modelValue: {
      type: [String, Number],
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
    },
    type: {
      type: String,
      default: 'text',
    },
  },

  setup() {
    const self = getCurrentInstance();
    const id = computed(() => `textfield-${self.uid}`);

    return {
      id,
    };
  },
};
</script>

<style lang="scss">
.textfield {
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
