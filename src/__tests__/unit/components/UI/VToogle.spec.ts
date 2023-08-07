import VToogle from "@/components/UI/VToogle.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe("VToogle component", () => {
  it("Should render", () => {
    const wrapper = mount(VToogle, {
      props: {
        modelValue: "value",
        "onUpdate:modelValue": (e: string) =>
          wrapper.setProps({ modelValue: e }),
        items: [{ text: "Test", value: "value" }],
      },
    });

    expect(wrapper.text()).toContain("Test");
  });

  it("Should update v-model", async () => {
    const wrapper = mount(VToogle, {
      props: {
        modelValue: "value",
        "onUpdate:modelValue": (e: string) =>
          wrapper.setProps({ modelValue: e }),
        items: [
          { text: "Test", value: "value" },
          { text: "Test2", value: "value2" },
        ],
      },
    });

    const firstButton = wrapper.find('button[data-testid="button-value"]');
    const secondButton = wrapper.find('button[data-testid="button-value2"]');
    await secondButton.trigger("click");
    expect(wrapper.props("modelValue")).toBe("value2");
    await firstButton.trigger("click");
    expect(wrapper.props("modelValue")).toBe("value");
  });

  it("Should have only one active button with active class", async () => {
    const wrapper = mount(VToogle, {
      props: {
        modelValue: "value",
        "onUpdate:modelValue": (e: string) =>
          wrapper.setProps({ modelValue: e }),
        items: [
          { text: "Test", value: "value" },
          { text: "Test2", value: "value2" },
        ],
      },
    });

    const firstButton = wrapper.find('button[data-testid="button-value"]');
    const secondButton = wrapper.find('button[data-testid="button-value2"]');

    expect(firstButton.classes()).toContain("toogle-button--active");
    await secondButton.trigger("click");

    expect(secondButton.classes()).toContain("toogle-button--active");

    const activeEl = wrapper.findAll("button.toogle-button--active");
    expect(activeEl.length).toBe(1);
  });
});
