<template>
  <ul v-if="cState.store.contas && cState.store.contas.length">
    <li v-for="conta in contas" :key="conta.id">
      {{ conta.descricao }} - {{ conta.tipo.descricao }} -
      <button @click="removeConta(conta)">X</button>
    </li>
  </ul>
  <div v-else>Não há contas para visualizar</div>
</template>
<script setup>
import { useContaStore } from '@/stores/contaStore'
import { computed, onMounted } from 'vue'
import { deleteConta } from '@/services/api'

const cState = useContaStore()

const contas = computed(() => {
  if (!cState.store.contas) return []
  return cState.store.contas.map((c) => {
    // TODO more augmentation or dedicated augmented query?
    c.tipo = cState.store.tiposConta.find((t) => t.id === c.tipo_conta_id)
    return c
  })
})

onMounted(() => {
  cState.sincronizarContas()
})

const removeConta = (conta) => {
  if (confirm('confirmar deletar conta?')) cState.removeConta(conta)
  cState.sincronizarContas()
}
</script>
<style scoped></style>