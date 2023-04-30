<template>
  <form @submit.prevent.stop="doLogin">
    <label>Email</label>
    <input v-model="email" required />
    <label>Senha</label>
    <input type="password" v-model="senha" required />
    <button type="submit">Login</button>
  </form>
</template>
<script setup>
import { ref } from "vue";
import { login } from "@/services/api";

const email = ref("");
const senha = ref("");

const doLogin = () => {
  console.log(login({ email: email.value, senha: senha.value }));
};
</script>
<style scoped></style>