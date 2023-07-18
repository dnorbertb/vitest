import VCheckbox from "@/components/UI/VCheckbox.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import { ref } from "vue";

describe("VCheckbox", () => {
  const testBool = ref(false);
  const wrapper = mount(VCheckbox, {
    props: {
      value: testBool.value,
      placeholder: "test",
    },
  });

  test("if component renders", () => {
    expect(wrapper.isVisible()).toBeTruthy();
  });

  test("if component emits change", async () => {
    await wrapper.trigger("change");
    expect(wrapper.emitted()).toHaveProperty("change");
  });
});
