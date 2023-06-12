import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IToDoItem } from '@/types/IToDoItem'

export const useToDoStore = defineStore('ToDoStore', () => {
  const toDoItems = ref<Array<IToDoItem>>([]);

  const addItem = (data: Omit<IToDoItem, 'id'>) => {
    const newItem = { id: new Date().getTime(), ...data };
    toDoItems.value.push(newItem);
    return newItem.id;
  };

  const removeItem = (id: number) => {
    toDoItems.value = toDoItems.value.filter(item => item.id !== id)
  };

  const setIsDone = (id: number, state: boolean) => {
    const item = toDoItems.value.find(item => item.id === id);
    if (!item) return;
    item.isDone = state;
  };

  return {
    toDoItems,
    addItem,
    removeItem,
    setIsDone
  }
})


