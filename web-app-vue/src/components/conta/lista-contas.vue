<template>
  <ul v-if="cState.store.contas && cState.store.contas.length">
    <detalhe-conta
      v-for="conta in contas"
      :key="conta.id"
      :conta="conta"
      @onUpdate="saveConta"
      @onRemove="removeConta"
    ></detalhe-conta>
  </ul>
  <div v-else>Não há contas para visualizar</div>
</template>
<script setup>
import { useContaStore } from '@/stores/contaStore'
import { computed, onMounted } from 'vue'
import DetalheConta from '@/components/conta/detalhe-conta.vue'

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

const saveConta = (conta) => {
  cState.salvarConta(conta)
  cState.sincronizarContas()
}

const removeConta = (conta) => {
  if (confirm('confirmar deletar conta?')) cState.removeConta(conta)
  cState.sincronizarContas()
}
</script>
<style scoped></style>