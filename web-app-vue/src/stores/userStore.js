import { computed, reactive } from "vue";
import { defineStore } from "pinia";
import jwt_decode from "jwt-decode";
import { clearRedLine, getRedLine, setRedLine } from "@/services/redLine";
import { removeAccount } from "@/services/api";

export const useUserStore = defineStore("user-store", () => {

  let redLine = getRedLine();

  const store = reactive({
    token: redLine?.token
  });


  const setToken = (_token) => {
    store.token = _token;
    redLine.token = _token;
    setRedLine(redLine);
  };

  const userData = computed(() => jwt_decode(store.token));

  const logout = () => {
    store.token = null;
    redLine = clearRedLine();
  };

  const deleteAccount = async ({ email, senha }) => {
    await removeAccount({ id: userData.value.id, email, senha });
    logout();
  };

  return { store, setToken, logout, userData, deleteAccount };
});
