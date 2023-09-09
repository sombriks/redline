<script setup>
import CardLogin from '@/components/usuario/card-login.vue'
import { router } from '@/routes/router'

const doLogin = async () => {
  await router.push('/')
}
</script>
<template>
  <card-login @onLogin="doLogin"></card-login>
</template>
