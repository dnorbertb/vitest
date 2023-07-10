import ListItem from "@/components/ListItem.vue";
import { useToDoStore } from "@/stores/itemsStore";
import { mount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import { describe, expect, it } from "vitest";

describe("ListItem", () => {
  setActivePinia(createPinia());
  const testItemValue = "Hello world!";
  const toDoStore = useToDoStore();
  const toDoItemId = toDoStore.addItem({ value: testItemValue, isDone: false });
  const wrapper = mount(ListItem, {
    props: {
      id: toDoItemId,
      value: testItemValue,
      isDone: false,
    },
  });

  it("Checks if item gets rendered", () => {
    expect(wrapper.text()).toContain(testItemValue);
  });

  it("Checks if item gets set as done", async () => {
    const checkbox = wrapper.find('input[type="checkbox"]');
    await checkbox.setValue(true);
    const item = toDoStore.toDoItems.find((i) => i.id === toDoItemId);
    expect(item?.isDone).toBeTruthy();
  });

  it("Checks if item gets deleted", async () => {
    const item = wrapper.find('button[type="button"]');
    await item.trigger("click");
    expect(toDoStore.toDoItems.length).toBe(0);
  });
});
