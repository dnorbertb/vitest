import { beforeEach, describe, expect, it, test, vi } from "vitest";
import { mount } from "@vue/test-utils";
import ToDoListView from "@/views/ToDoListView.vue";
import { useToDoStore } from "@/stores/itemsStore";
import ListItem from "@/components/ListItem.vue";

describe("ToDoList", () => {
  vi.mock("@/stores/itemsStore", () => ({
    useToDoStore: vi.fn().mockReturnValue({
      toDoItems: [
        {
          id: 1,
          value: "This is test item",
          isDone: true,
        },
      ],
      removeItem: vi.fn(),
      addItem: vi.fn(),
      setIsDone: vi.fn(),
    }),
  }));

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Should render", async () => {
    const wrapper = mount(ToDoListView);
    const contentSection = wrapper.get("section.content");
    const form = wrapper.find("form.add-item-form");
    const itemList = wrapper.find("div.items-list");
    expect(contentSection.isVisible()).toBeTruthy();
    expect(form.isVisible()).toBeTruthy();
    expect(itemList.isVisible()).toBeTruthy();
  });

  it("Should have items visible in the list", () => {
    const wrapper = mount(ToDoListView);
    expect(wrapper.text()).toContain("This is test item");
  });

  it("Should have addItem method called with right arguments", () => {
    const wrapper = mount(ToDoListView);
    const textInput = wrapper.find('input[data-testid="formTextInput"]');
    const button = wrapper.find('button[data-testid="formSubmitButton"]');
    const testValue = "value";
    textInput.setValue(testValue);
    // Be aware that even if button in the template has type of "submit" and you trigger "click" event on element
    // Form will not get submitted! Example:
    // button.trigger("click") - not work!
    button.trigger("submit"); // - work!
    const calls = vi.mocked(useToDoStore()).addItem.mock.calls;
    expect(vi.mocked(useToDoStore()).addItem).toHaveBeenCalled();
    expect(calls[0][0]).toEqual({ value: testValue, isDone: false });
  });

  test("Form shouldn't call addItem method in pinia store if text input is empty", async () => {
    const wrapper = mount(ToDoListView);
    const button = wrapper.find('button[data-testid="formSubmitButton"]');
    await button.trigger("submit");
    expect(vi.mocked(useToDoStore()).addItem).not.toHaveBeenCalled();
  });

  it("Should have removeItem and setIsDone triggered by list item", () => {
    const wrapper = mount(ToDoListView);
    const listItem = wrapper.findComponent(ListItem);
    listItem.vm.$emit("removeItem", 1);
    listItem.vm.$emit("setItemDone", { id: 1, status: true });
    expect(vi.mocked(useToDoStore()).removeItem).toHaveBeenCalled();
    expect(vi.mocked(useToDoStore()).setIsDone).toHaveBeenCalled();
  });

  it("Should react on filters", async () => {
    const wrapper = mount(ToDoListView);
    // Before applying filter
    const items = wrapper.findAllComponents(ListItem);
    expect(items.length).toBe(1);

    // Applying filter
    // Not just (VToogle) below because TS shows error
    // This probably occurs because VToogle is generic component and this is quite new feature in Vue, can be not completely supported!
    const listItem = wrapper.findComponent({ name: "VToogle" });
    await listItem.vm.$emit("update:modelValue", "todo");

    // After applying
    const itemsAfter = wrapper.findAllComponents(ListItem);
    expect(itemsAfter.length).toBe(0);
  });
});
