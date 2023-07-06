<template>
  <ul>
    <li></li>
  </ul>
</template>
<script setup>
import { useMovimentacaoStore } from '@/stores/movimentacaoStore'
import { onMounted } from 'vue'

const mState = useMovimentacaoStore()

onMounted(() => {
  mState.sincronizarMovimentacoes()
})
</script>
<style scoped></style>
