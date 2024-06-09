<script setup>
import { useRouter } from 'vue-router'
import CardLogin from '@/pages/usuario/card-login.vue'

const router = useRouter()

const doLogin = async () => {
  await router.push('/')
}
</script>
<template>
  <card-login @onLogin="doLogin"></card-login>
</template>
