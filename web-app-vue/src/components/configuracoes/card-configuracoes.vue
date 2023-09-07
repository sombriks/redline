<template>
  <div>
    <h3>Olá {{ uStore.userData.nome }}</h3>
    <button @click="logout()">Desconectar</button>
    <hr />
    <button @click="wantDelete = true" v-if="!wantDelete">Excluir conta</button>
    <form v-if="wantDelete" @submit.prevent.stop="deleteAccount">
      <label for="confirmPwd">Confirme sua senha </label>
      <input id="confirmPwd" required type="password" v-model="pwd" />
      <button type="submit">Excluir</button>
    </form>
  </div>
</template>
<script setup>
import { ref } from "vue";

import { useUserStore } from "@/stores/userStore";
import { router } from "@/routes/router";

const wantDelete = ref(false);
const pwd = ref("");

const uStore = useUserStore();

const logout = async () => {
  uStore.logout();
  await router.push("/")
};

const deleteAccount = async () => {
  const user = {
    email: uStore.userData.email,
    senha: pwd.value
  };
  await uStore.deleteAccount(user);
  await router.push("/")
};
</script>
<style scoped></style>
