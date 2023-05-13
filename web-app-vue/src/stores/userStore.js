import { reactive } from "vue";
import { defineStore } from "pinia";
import { clearRedLine, getRedLine, setRedLine } from "@/services/redLine";

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

  const logout = () => {
    redLine = null;
    store.token = null;
    clearRedLine();
  };

  return { store, setToken, logout };
});
