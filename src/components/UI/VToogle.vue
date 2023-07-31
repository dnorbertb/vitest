<script setup lang="ts" generic="T">
defineProps<{
  modelValue: T;
  items: Array<{ text: string; value: T }>;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: T): void;
}>();
</script>
<template>
  <div class="toogle">
    <button
      v-for="(item, i) in items"
      :class="[
        'toogle-button',
        modelValue === item.value && 'toogle-button--active',
      ]"
      :key="`btn-${i}`"
      :data-testid="`button-${item.value}`"
      @click="emit('update:modelValue', item.value)"
    >
      {{ item.text }}
    </button>
  </div>
</template>
<style scoped>
.toogle {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  padding: 4px 8px;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 8px;
}

.toogle-button {
  color: gray;
  text-decoration: underline;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.3s;
}

.toogle-button--active {
  color: darksalmon;
}
</style>
