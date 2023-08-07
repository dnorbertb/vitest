import VButton from "@/components/UI/VButton.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe("VButton", () => {
  it("Should render", () => {
    const wrapper = mount(VButton, {
      props: {
        type: "button",
        text: "Click me",
      },
    });

    expect(wrapper.text().toLocaleLowerCase()).toContain("click me");
  });

  it("Should have right type set by prop", async () => {
    const wrapper = mount(VButton, {
      props: {
        type: "button",
        text: "Click me",
      },
    });

    expect(wrapper.attributes().type).toBe("button");
    await wrapper.setProps({ type: "reset" });
    expect(wrapper.attributes().type).toBe("reset");
    await wrapper.setProps({ type: "submit" });
    expect(wrapper.attributes().type).toBe("submit");
  });

  it("Should emit click event", () => {
    const wrapper = mount(VButton, {
      props: {
        type: "button",
        text: "Click me",
      },
    });

    wrapper.find("button").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("click");
  });
});
