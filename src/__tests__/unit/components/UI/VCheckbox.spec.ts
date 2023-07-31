import VCheckbox from "@/components/UI/VCheckbox.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

describe("VCheckbox", () => {
  test("if component renders", () => {
    const wrapper = mount(VCheckbox, {
      props: {
        value: true,
      },
    });

    expect(wrapper.isVisible()).toBeTruthy();
  });

  test("if component emits change", async () => {
    const wrapper = mount(VCheckbox, {
      props: {
        value: true,
      },
    });
    await wrapper.trigger("change");
    expect(wrapper.emitted()).toHaveProperty("change");
  });
});
