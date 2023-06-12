<script setup lang="ts">
import { ref } from 'vue';
import { useToDoStore } from '@/stores/itemsStore';
import VTextInput from '@/components/UI/VTextInput.vue';
import VButton from '@/components/UI/VButton.vue';
import ListItem from '@/components/ListItem.vue';
import AppLogo from '../components/AppLogo.vue';

const toDoStore = useToDoStore();

const itemTitle = ref('');
const submitHandler = () => {
  if (!itemTitle) return;
  toDoStore.addItem({ value: itemTitle.value, isDone: false });
  itemTitle.value = '';
};
</script>

<template>
  <main>
    <AppLogo />
    <section class="content">
      <form class="add-item-form" @submit.prevent="submitHandler">
        <VTextInput v-model="itemTitle" placeholder="Wpisz tytuł..." />
        <VButton text="Dodaj" type="submit" />
      </form>
      <div class="items-list">
        <ListItem
          v-for="(item, index) in toDoStore.toDoItems"
          :key="`item-${index}`"
          v-bind="item"
        />
      </div>
    </section>
  </main>
</template>
<style scoped>
main {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: var(--color-primary);
}

.content {
  max-width: 50rem;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.add-item-form {
  display: flex;
  gap: 1rem;
  max-width: 100%;
  margin-bottom: 2rem;
}

.items-list {
  width: 100%;
}
</style>
