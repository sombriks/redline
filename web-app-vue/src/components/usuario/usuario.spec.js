import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import CardLogin from "./card-login.vue";

describe("Módulo de usuários", () => {
  it("monta o componente de login ", () => {
    const wrapper = mount(CardLogin /*{ props: { msg: 'Hello Vitest' } }*/);
    expect(wrapper.text()).toContain("Email");
    wrapper
      .find("button[aria-roledescription='create-mode']")
      .trigger("click", () => {
        expect(wrapper.text()).toContain("Nome");
    })
  });
});
