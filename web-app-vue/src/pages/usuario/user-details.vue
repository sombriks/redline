<script setup>
import {reactive, ref} from 'vue'
import {useUserStore} from '@/stores/userStore'
import {minSizeRule, requiredRule} from '@/services/basic-rules'
import {useRoute, useRouter} from 'vue-router'

const valid = ref(false)
const uState = useUserStore()
const router = useRouter()

const userUpdate = reactive({
  id: uState.userData.id,
  nome: uState.userData.nome,
  email: uState.userData.email,
  senha: ''
})

const save = async () => {
  if (!valid.value) return
  if (confirm('Deseja realmente alterar seus dados pessoais?')) {
    try {
      // TODO alterar os dados e descartar o link de alteração
      await uState.update(userUpdate)
      await uState.logout()
      await router.push('/auth')
    } catch (e) {
      console.log(e)
      alert(e?.message || 'Problema ao atualizar')
    }
  }
}

const cancelar = async () => {
  await router.push('/')
}
</script>
<template>
  <v-card title="Editar dados pessoais" elevation="24">
    <v-form v-model="valid" @submit.prevent.stop="save" class="auth-form">
      <v-text-field
          :rules="[requiredRule('Nome obrigatório')]"
          v-model="userUpdate.nome"
          label="Nome"
          required
      ></v-text-field>
      <v-text-field
          :rules="[requiredRule('Email obrigatório')]"
          v-model="userUpdate.email"
          label="Email"
          required
          type="email"
      ></v-text-field>
      <v-text-field
          :rules="[requiredRule('Senha obrigatória'), minSizeRule(6, 'Senha deve ter no mínimo 6 caracteres')]"
          v-model="userUpdate.senha"
          label="Senha"
          required
          type="password"
      ></v-text-field>
      <v-divider/>
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
