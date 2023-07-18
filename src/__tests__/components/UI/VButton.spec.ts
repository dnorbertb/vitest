import VButton from "@/components/UI/VButton.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe("VButton", () => {
  const wrapper = mount(VButton, {
    props: {
      type: "button",
      text: "Click me",
    },
  });

  it("Checks if component renders", () => {
    expect(wrapper.isVisible()).toBeTruthy();
  });

  it("Checks if button gets right type", async () => {
    expect(wrapper.attributes().type).toBe("button");
    await wrapper.setProps({ type: "reset" });
    expect(wrapper.attributes().type).toBe("reset");
    await wrapper.setProps({ type: "submit" });
    expect(wrapper.attributes().type).toBe("submit");
  });

  it("Checks if click event gets emitted", () => {
    wrapper.find("button").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("click");
  });
});
