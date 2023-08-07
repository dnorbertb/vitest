import ListItem from "@/components/ListItem.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe("ListItem", () => {
  it("Should render", () => {
    const testItemValue = "test value";
    const wrapper = mount(ListItem, {
      props: {
        id: 1,
        value: testItemValue,
        isDone: true,
      },
    });
    expect(wrapper.text()).toContain(testItemValue);
  });

  it("Should emit setItemDone", async () => {
    const wrapper = mount(ListItem, {
      props: {
        id: 1,
        value: "Value",
        isDone: true,
      },
    });

    const checkboxEl = wrapper.find('input[type="checkbox"]');
    checkboxEl.trigger("change");
    expect(wrapper.emitted()).toHaveProperty("setItemDone");
  });

  it("Should emit removeItem", async () => {
    const wrapper = mount(ListItem, {
      props: {
        id: 1,
        value: "Value",
        isDone: true,
      },
    });

    const checkboxEl = wrapper.find('button[type="button"]');
    checkboxEl.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("removeItem");
  });
});
