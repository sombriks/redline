import { reactive } from "vue";
import { defineStore } from "pinia";
import { getRedLine } from "@/services/redLine";

export const useCarteiraStore = defineStore("carteira-store", () => {

  let redLine = getRedLine();

  const store = reactive({
    carteiras: redLine.carteiras
  });
})
