import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

export const useCardState = defineStore("card-state", () => {

  let redLine = {};

  const lastState = localStorage.getItem("redLine");
  if (!lastState) {
    redLine = {
      activeCard: {
        login: false,
        movimentacao: false,
        categorias: false,
        planejamentos: false,
        carteirasContas: false,
        configuracoes: false
      }
    };
  } else {
    redLine = JSON.parse(lastState);
  }

  const activeCard = reactive(redLine.activeCard);

  const toggleCard = (k, v) => {
    Object.keys(activeCard).forEach(k => activeCard[k] = false);
    activeCard[k] = v;
    redLine.activeCard = activeCard;
    localStorage.setItem("redLine", JSON.stringify(redLine));
  };

  return { activeCard, toggleCard };
});
