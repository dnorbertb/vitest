import VTextInput from "@/components/UI/VTextInput.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe("VTextInput", () => {
  it("Should render", () => {
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

  it("Should update v-model", async () => {
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
