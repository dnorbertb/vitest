<script setup lang="ts">
import { useToDoStore } from '@/stores/itemsStore';
import VCheckbox from './UI/VCheckbox.vue';
import VButton from './UI/VButton.vue';
import type { IToDoItem } from '@/types/IToDoItem';

interface IEvent extends Event {
  target: HTMLInputElement;
}

const props = defineProps<IToDoItem>();
const toDoStore = useToDoStore();

const removeItem = () => {
  toDoStore.removeItem(props.id);
};

const setIsDone = (state: boolean) => {
  toDoStore.setIsDone(props.id, state);
};
</script>
<template>
  <div class="item">
    <VCheckbox
      :value="isDone"
      @change="(v: IEvent) => setIsDone(v.target.checked)"
    />
    <h5 :class="['item-title', isDone && 'line-through']">{{ value }}</h5>
    <VButton
      style="margin-left: auto"
      type="button"
      text="Delete"
      @click="removeItem"
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
