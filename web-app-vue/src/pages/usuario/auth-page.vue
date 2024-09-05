<script setup>
import { useRouter } from 'vue-router'
import CardLogin from '@/pages/usuario/card-login.vue'

const router = useRouter()

const doLogin = async () => {
  await router.push('/')
}

const confirmaCadastro = async (email) => {
  console.log('aguardar confirmação')
  await router.push(`/confirma-cadastro/${email}`)
}

</script>
<template>
  <card-login @onLogin="doLogin" @confirmaCadastro="confirmaCadastro"></card-login>
</template>
