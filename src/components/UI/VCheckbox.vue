<script setup lang="ts">
interface IProps {
  value: boolean;
}

defineProps<IProps>();
</script>

<template>
  <input :checked="value" type="checkbox" />
</template>
