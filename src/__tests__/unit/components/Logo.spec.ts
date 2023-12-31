import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import AppLogo from "@/components/AppLogo.vue";

describe("Logo", () => {
  it("Should render", () => {
    const wrapper = mount(AppLogo);
    expect(wrapper.text()).toContain("To Do List");
  });
});
