<script setup lang="ts">
import VButton from "@/components/UI/VButton.vue";
import VCheckbox from "@/components/UI/VCheckbox.vue";
import type { IToDoItem } from "@/types/IToDoItem";

interface IEvent extends Event {
  target: HTMLInputElement;
}

const props = defineProps<IToDoItem>();
const emit = defineEmits<{
  (e: "setItemDone", value: { id: number; status: boolean }): void;
  (e: "removeItem", value: number): void;
}>();
</script>
<template>
  <div class="item">
    <VCheckbox
      :value="isDone"
      @change="(v: IEvent) => emit('setItemDone', {id: props.id, status: v.target.checked})"
    />
    <h5 :class="['item-title', isDone && 'line-through']">{{ value }}</h5>
    <VButton
      style="margin-left: auto"
      type="button"
      text="Delete"
      @click="() => emit('removeItem', props.id)"
    />
  </div>
</template>
<style scoped>
.item {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}

.item-title {
  font-weight: 300;
  font-size: 2rem;
}

.line-through {
  text-decoration: line-through;
}
</style>
