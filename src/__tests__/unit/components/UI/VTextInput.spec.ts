import VTextInput from "@/components/UI/VTextInput.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

describe("VTextInput", () => {
  test("if element renders", () => {
    const testValue = "initialText";
    const wrapper = mount(VTextInput, {
      props: {
        modelValue: testValue,
        placeholder: testValue,
      },
    });
    expect(wrapper.attributes().placeholder).toContain(testValue);
    expect(wrapper.find("input").element.value).toBe(testValue);
  });

  test("if input updates model value", async () => {
    const wrapper = mount(VTextInput, {
      props: {
        modelValue: "initialText",
        "onUpdate:modelValue": (e: string) =>
          wrapper.setProps({ modelValue: e }),
      },
    });

    await wrapper.find("input").setValue("test");
    expect(wrapper.props("modelValue")).toBe("test");
  });
});
