import VCheckbox from "@/components/UI/VCheckbox.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe("VCheckbox", () => {
  it("Should render", () => {
    const wrapper = mount(VCheckbox, {
      props: {
        value: true,
      },
    });

    expect(wrapper.isVisible()).toBeTruthy();
  });

  it("Should emit change event", async () => {
    const wrapper = mount(VCheckbox, {
      props: {
        value: true,
      },
    });
    await wrapper.trigger("change");
    expect(wrapper.emitted()).toHaveProperty("change");
  });
});
