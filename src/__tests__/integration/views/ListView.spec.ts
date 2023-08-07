import { beforeEach, describe, expect, it, test } from "vitest";
import { mount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import ToDoListView from "@/views/ToDoListView.vue";
import { useToDoStore } from "@/stores/itemsStore";

// Chat GPT says that those are integration tests
// These tests are checking if toDoStore is properly integrated with ToDoListView component
// After some research I found that such tests are not really popular
describe("ToDoList view integration test", () => {
  setActivePinia(createPinia());
  const testItem = "Yolo";
  const wrapper = mount(ToDoListView);
  const toDoStore = useToDoStore();

  beforeEach(() =>
    toDoStore.toDoItems.forEach((i) => toDoStore.removeItem(i.id))
  );

  const fillAndSubmitForm = async () => {
    const input = wrapper.find('input[type="text"]');
    await input.setValue(testItem);
    const form = wrapper.find("form.add-item-form");
    await form.trigger("submit");
  };

  it("Should render", async () => {
    const contentSection = wrapper.get("section.content");
    const form = wrapper.find("form.add-item-form");
    const itemList = wrapper.find("div.items-list");
    expect(contentSection.isVisible()).toBeTruthy();
    expect(form.isVisible()).toBeTruthy();
    expect(itemList.isVisible()).toBeTruthy();
  });

  test("Form adds item to the store", async () => {
    await fillAndSubmitForm();
    const item = toDoStore.toDoItems.find((i) => i.value === testItem);
    expect(item).toBeTruthy();
    expect(item?.value).toEqual(testItem);
  });

  it("Should show the item", async () => {
    await fillAndSubmitForm();
    const item = wrapper.find("div.items-list");
    expect(item.text()).toContain(testItem);
  });
});
