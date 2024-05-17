<script setup>
import CardLogin from '@/pages/components/usuario/card-login.vue'
import { router } from '@/services/router'

const doLogin = async () => {
  await router.push('/')
}
</script>
<template>
  <card-login @onLogin="doLogin"></card-login>
</template>
