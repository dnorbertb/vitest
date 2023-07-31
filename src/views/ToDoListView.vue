<script setup lang="ts">
import { computed, ref } from "vue";
import { useToDoStore } from "@/stores/itemsStore";
import VTextInput from "@/components/UI/VTextInput.vue";
import VButton from "@/components/UI/VButton.vue";
import ListItem from "@/components/ListItem.vue";
import AppLogo from "../components/AppLogo.vue";
import VToogle from "@/components/UI/VToogle.vue";

const toDoStore = useToDoStore();
const itemTitle = ref("");
const toogleValue = ref<"all" | "todo">("all");
const toogleItems = [
  { text: "Pokaż wszystkie", value: "all" },
  { text: "Pokaż do zrobienia", value: "todo" },
];

const filteredItems = computed(() =>
  toDoStore.toDoItems.filter((item) => {
    if (toogleValue.value === "all") return true;
    return item.isDone === false;
  })
);

const submitHandler = () => {
  if (!itemTitle.value) return;
  toDoStore.addItem({ value: itemTitle.value, isDone: false });
  itemTitle.value = "";
};

const removeItem = (id: number) => {
  toDoStore.removeItem(id);
};

const setItemDone = ({ id, status }: { id: number; status: boolean }) => {
  toDoStore.setIsDone(id, status);
};
</script>

<template>
  <main>
    <AppLogo />
    <section class="content">
      <form class="add-item-form" @submit.prevent="submitHandler">
        <VTextInput
          data-testid="formTextInput"
          v-model="itemTitle"
          placeholder="Wpisz tytuł..."
        />
        <VButton data-testid="formSubmitButton" text="Dodaj" type="submit" />
      </form>
      <VToogle :items="toogleItems" v-model="toogleValue" />
      <div class="items-list">
        <ListItem
          v-for="(item, index) in filteredItems"
          :key="`item-${index}`"
          v-bind="item"
          @remove-item="removeItem"
          @set-item-done="setItemDone"
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
