import { reactive } from "vue";
import { defineStore } from "pinia";
import { getRedLine, setRedLine } from "@/services/redLine";

export const useCardStore = defineStore("card-store", () => {

  const store = reactive({
    activeCard: getRedLine().activeCard
  });

  const toggleCard = (k, v) => {
    Object.keys(store.activeCard).forEach(k => store.activeCard[k] = false);
    store.activeCard[k] = v;
    let redLine = getRedLine();
    redLine.activeCard = store.activeCard;
    setRedLine(redLine);
  };

  return { store, toggleCard };
});
