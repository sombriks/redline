import { reactive } from "vue";
import { defineStore } from "pinia";
import { getRedLine, setRedLine } from "@/services/redLine";
import { useUserStore } from "@/stores/userStore";
import { listCarteiras } from "@/services/api";

export const useCarteiraStore = defineStore("carteira-store", () => {

  const uState = useUserStore();

  const store = reactive({
    carteiras: getRedLine()?.carteiras || []
  });

  const sincronizar = async () => {
    store.carteiras = await listCarteiras({ id: uState.userData.id });
  };

  return { store, sincronizar };
});
