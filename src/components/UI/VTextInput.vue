<script setup lang="ts">
import { computed } from 'vue';

interface IProps {
  modelValue: string;
  placeholder?: string;
}

interface IEmits {
  (e: 'update:modelValue', value: string): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const computedModel = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emit('update:modelValue', value);
  },
});
</script>

<template>
  <input
    class="text-input"
    :placeholder="placeholder"
    v-model="computedModel"
    type="text"
  />
</template>

<style scoped>
.text-input {
  min-width: 0;
  padding: 1rem 1.5rem;
  border: 2px solid salmon;
  border-radius: 1.4rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.text-input:focus {
  outline: none;
  border-color: red;
}
</style>
