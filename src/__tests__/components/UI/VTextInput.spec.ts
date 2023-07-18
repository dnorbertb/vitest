import VTextInput from "@/components/UI/VTextInput.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

describe("VTextInput", () => {
  const wrapper = mount(VTextInput, {
    props: {
      modelValue: "initialText",
      "onUpdate:modelValue": (e: string) => wrapper.setProps({ modelValue: e }),
    },
  });

  test("if element renders", () => {
    expect(wrapper.isVisible()).toBeTruthy();
  });

  test("if model value updates", async () => {
    await wrapper.find("input").setValue("test");
    expect(wrapper.props("modelValue")).toBe("test");
  });
});
