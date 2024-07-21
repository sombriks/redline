<template>
  <v-card :title="createMode ? 'Criar conta' : 'Login'" elevation="24">
    <v-form v-model="valid" @submit.prevent.stop="doLogin" class="auth-form">
      <v-text-field
        :rules="[requiredRule('Nome obrigatório')]"
        v-if="createMode"
        v-model="nome"
        label="Nome"
        required
      ></v-text-field>
      <v-text-field
        :rules="[requiredRule('Email obrigatório')]"
        v-model="email"
        label="Email"
        required
        type="email"
      ></v-text-field>
      <v-text-field
        :rules="[requiredRule('Senha obrigatória'), minSizeRule(6, 'Senha deve conter no mínimo 6 caracteres')]"
        v-model="senha"
        label="Senha"
        required
        type="password"
      ></v-text-field>
      <v-text-field
        :rules="[requiredRule()]"
        v-if="createMode"
        v-model="invite"
        label="Convite"
        required
      ></v-text-field>
      <v-divider></v-divider>
      <v-btn type="submit">{{ createMode ? 'Criar conta' : 'Login' }}</v-btn>
      <v-btn
        variant="tonal"
        aria-roledescription="create-mode"
        type="button"
        @click="createMode = !createMode"
      >
        {{ createMode ? 'Cancelar' : 'Criar conta' }}
      </v-btn>
    </v-form>

    <v-divider />
    <div class="column center">
      <a class="item" href="https://github.com/sombriks/redline" target="_blank">
        Este aplicativo é de código aberto</a
      >
    </div>
  </v-card>
</template>
<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { minSizeRule, requiredRule } from '@/services/basic-rules'

const nome = ref('')
const email = ref('')
const senha = ref('')
const invite = ref('')
const createMode = ref(false)
const valid = ref(false)
const uState = useUserStore()

const emit = defineEmits(['onLogin'])

const doLogin = async () => {
  if (!valid.value) return
  try {
    if (createMode.value) {
      await uState.doCreateUser({
        nome: nome.value,
        email: email.value,
        senha: senha.value,
        invite: invite.value
      })
    }
    const result = await uState.doLogin({ email: email.value, senha: senha.value })
    // TODO guardar informação do usuário logado
    uState.setToken(result.token)
    emit('onLogin')
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

.column {
  display: flex;
  flex-direction: column;
}

.item {
  margin: 5px;
}

.row {
  display: flex;
  flex-direction: row;
}

.center {
  align-items: center;
}
</style>
