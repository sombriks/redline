<template>
  <v-card :title="createMode ? 'Criar conta' : 'Login'">
    <v-form v-model="valid" @submit.prevent.stop="doLogin" class="auth-form">
      <v-text-field :rules=[requiredRule] v-if="createMode" v-model="nome" label="Nome" required></v-text-field>
      <v-text-field :rules=[requiredRule] v-model="email" label="Email" required type="email"></v-text-field>
      <v-text-field :rules=[requiredRule] v-model="senha" label="Senha" required type="password"></v-text-field>
      <hr />
      <v-btn v-if="!createMode" type="submit">Login</v-btn>
      <v-btn type="button" @click="createMode = !createMode">
        {{ createMode ? 'Cancelar' : 'Criar conta' }}
      </v-btn>
      <v-btn v-if="createMode" type="submit">Criar</v-btn>
    </v-form>
  </v-card>
</template>
<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { router } from "@/routes/router";

const nome = ref('')
const email = ref('')
const senha = ref('')
const createMode = ref(false)
const valid = ref(false)
const uState = useUserStore()

const requiredRule = value => {
  if(value) return true
  return "Required field"
}

const doLogin = async () => {
  if(!valid.value) return
  try {
    if (createMode.value) {
      await uState.doCreateUser({
        nome: nome.value,
        email: email.value,
        senha: senha.value
      })
    }
    const result = await uState.doLogin({ email: email.value, senha: senha.value })
    // TODO guardar informação do usuário logado
    uState.setToken(result.token)
    await router.push("/")
  } catch (e) {
    console.log(e)
    alert('Algo deu errado')
  }
}
</script>
<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  min-width: 300px;
  padding: 1em;
}

label,
input,
button {
  margin: 0.5em;
}
</style>
