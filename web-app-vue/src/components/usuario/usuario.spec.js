import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import CardLogin from "./card-login.vue";

describe("Módulo de usuários", () => {
  it("monta o componente", () => {
    const wrapper = mount(CardLogin /*{ props: { msg: 'Hello Vitest' } }*/);
    expect(wrapper.text()).toContain("Email");
  });
});