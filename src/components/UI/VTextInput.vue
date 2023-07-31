<script setup lang="ts">
interface IProps {
  modelValue: string;
  placeholder?: string;
}

interface IEmits {
  (e: "update:modelValue", value: string): void;
}

defineProps<IProps>();
const emit = defineEmits<IEmits>();
</script>

<template>
  <input
    class="text-input"
    :placeholder="placeholder"
    :value="modelValue"
    @input="(e) => emit('update:modelValue', (e.target as HTMLInputElement).value)"
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
