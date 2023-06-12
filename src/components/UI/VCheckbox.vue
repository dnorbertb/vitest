<script setup lang="ts">
interface IProps {
  value: boolean;
  placeholder?: string;
}

defineProps<IProps>();
</script>

<template>
  <input :checked="value" type="checkbox" />
</template>
