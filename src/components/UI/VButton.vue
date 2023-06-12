<script setup lang="ts">
defineProps<{
  type: HTMLButtonElement['type'];
  text: string;
}>();
</script>

<template>
  <button class="button" :type="type">
    {{ text.toUpperCase() }}
  </button>
</template>
<style scoped>
.button {
  color: white;
  font-weight: 600;
  padding: 1rem;
  border: none;
  border-radius: 1.4rem;
  background-color: darksalmon;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:focus {
  outline: none;
  background-color: red;
}

.button:active {
  outline: none;
  background-color: darkred;
}
</style>
