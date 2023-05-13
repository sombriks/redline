import { reactive } from "vue";
import { defineStore } from "pinia";
import { getRedLine, setRedLine } from "@/services/redLine";

export const useCardStore = defineStore("card-state", () => {

  let redLine = getRedLine();

  const store = reactive({
    activeCard: redLine.activeCard
  });

  const toggleCard = (k, v) => {
    Object.keys(store.activeCard).forEach(k => store.activeCard[k] = false);
    store.activeCard[k] = v;
    redLine.activeCard = store.activeCard;
    setRedLine(redLine);
  };

  return { store, toggleCard };
});
