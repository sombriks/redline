<template>
  <v-card title="Editar dados pessoais" elevation="24">
    <v-form v-model="valid" @submit.prevent.stop="save" class="auth-form">
      <v-text-field
        :rules="[requiredRule]"
        v-model="user.nome"
        label="Nome"
        required
      ></v-text-field>
      <v-text-field
        :rules="[requiredRule]"
        v-model="user.email"
        label="Email"
        required
        type="email"
      ></v-text-field>
      <v-text-field
        :rules="[requiredRule]"
        v-model="user.senha"
        label="Senha"
        required
        type="password"
      ></v-text-field>
      <v-text-field
        :rules="[requiredRule]"
        v-model="user.repetirSenha"
        label=" Confirma Senha"
        required
        type="password"
      ></v-text-field>
      <v-divider />
      <div class="row">
        <v-btn
          variant="outlined"
          class="ma-2"
          color="green"
          type="submit"
          icon="mdi-check"
        ></v-btn>
        <v-spacer></v-spacer>
        <v-btn
          variant="outlined"
          color="red"
          class="ma-2"
          type="button"
          @click="cancelar"
          icon="mdi-close"
        ></v-btn>
      </div>
    </v-form>
  </v-card>
</template>
<script setup>

import { reactive, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { requiredRule } from '@/services/basic-rules'
import { useRouter } from 'vue-router'

const valid = ref(false)
const uState = useUserStore()
const router = useRouter()

const user = reactive({
  nome: uState.userData.nome,
  email: uState.userData.email,
  senha: '',
  repetirSenha: ''
})

const save = async () => {
  if (!valid.value) return
  if(confirm("Deseja realmente alterar seus dados pessoais?")) {
    alert('Verifique o email de confirmação de alteração de dados')
    // TODO alterar os dados e descartar o link de alteração
    await uState.logout()
    await router.push('/auth')
  }
}

const cancelar = async () => {
  if(confirm('Deseja realmente cancelar? será preciso gerar um novo link de alteração de dados!')) {
    // TODO descartar o link de alteração
    await uState.logout()
    await router.push('/auth')
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
.row {
  display: flex;
  flex-direction: row;
}
</style>
