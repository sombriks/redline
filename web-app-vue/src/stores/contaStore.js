import { reactive } from "vue";
import { defineStore } from "pinia";
import { getRedLine, setRedLine } from "@/services/redLine";
import { useUserStore } from "@/stores/userStore";
import { listContas } from "@/services/api";

export const useContaStore = defineStore("conta-store", () => {

  const uState = useUserStore();

  function initStore() {
    const redLine = getRedLine()
    return reactive({
      contas: redLine?.contas || [],
      tiposConta: redLine?.tiposConta || []
    })
  }

  const store = initStore();

  const sincronizar = async () => {
    const redLine = getRedLine()
    const contas = await listContas({ id: uState.userData.id });
    store.contas = contas
    setRedLine({ ...redLine, contas })
  };

  return { store, sincronizar };
});
