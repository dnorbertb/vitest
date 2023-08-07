import { useToDoStore } from "@/stores/itemsStore";
import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect } from "vitest";

// Testing data store
describe("ToDoItem store", () => {
  // Pinia store can't work without an instance
  // So we need to create pinia instance
  setActivePinia(createPinia());
  const toDoStore = useToDoStore();
  const testItemData = { value: "Test item", isDone: false };
  let testItemId: number;

  it("Should have method to add item to the store", () => {
    testItemId = toDoStore.addItem(testItemData);
    expect(toDoStore.toDoItems.length).toBe(1);
  });

  it("Should have method to modify isDone property in stored item", () => {
    toDoStore.setIsDone(testItemId, true);
    const item = toDoStore.toDoItems.find((i) => i.id === testItemId);
    expect(item?.isDone).toBe(true);
  });

  it("Should not crash if isDone property is set on nonexisting item", () => {
    expect(() => toDoStore.setIsDone(1, true)).not.toThrow();
  });

  it("Should have method to remove the item", () => {
    toDoStore.removeItem(testItemId);
    expect(toDoStore.toDoItems.length).toBe(0);
  });
});
