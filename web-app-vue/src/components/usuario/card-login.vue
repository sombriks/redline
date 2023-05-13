<template>
  <form @submit.prevent.stop="doLogin">
    <label v-if="createMode">Nome</label>
    <input v-if="createMode" v-model="nome" required />
    <label>Email</label>
    <input type="email" v-model="email" required />
    <label>Senha</label>
    <input type="password" v-model="senha" required />
    <hr>
    <button v-if="!createMode" type="submit">Login</button>
    <button type="button" aria-roledescription="create-mode" @click="createMode = !createMode">{{createMode ? "Cancelar" : "Criar conta"}}</button>
    <button v-if="createMode" type="submit">Criar</button>
  </form>
</template>
<script setup>
import { ref } from "vue";
import { login, createUser } from "@/services/api";
import { useUserStore } from "@/stores/userStore";

const nome = ref("");
const email = ref("");
const senha = ref("");
const createMode = ref(false);

const uState = useUserStore()

const doLogin = async () => {
  try {
    if(createMode.value) {
      const creationResult = await createUser({
        nome: nome.value, email: email.value, senha: senha.value
      })
    }
    const result = await login({ email: email.value, senha: senha.value });
    // TODO guardar informação do usuário logado
    uState.setToken(result.token)
  } catch (e) {
    console.log(e);
    alert("Algo deu errado");
  }
};
</script>
<style scoped>
form {
    display: flex;
    flex-direction: column;
}

label, input, button {
    margin: 0.5em;
}
</style>
