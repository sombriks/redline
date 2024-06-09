<template>
  <v-container fluid>
    <v-card elevation="24" min-width="320">
      <v-card-text>
        <v-radio-group inline label="Operação" v-model="operacao">
          <v-radio label="Pagamento" value="pagamento"></v-radio>
          <v-radio label="Transferência" value="transferencia"></v-radio>
        </v-radio-group>
        <pagamento-form v-if="operacao === 'pagamento'"></pagamento-form>
        <transferencia-form v-if="operacao === 'transferencia'"></transferencia-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import PagamentoForm from '@/pages/pagamento/pagamento-form.vue'
import TransferenciaForm from '@/pages/pagamento/transferencia-form.vue'
import { useMovimentacaoStore } from '@/stores/movimentacaoStore'
import { useCategoriaStore } from '@/stores/categoriaStore'
import { useContaStore } from '@/stores/contaStore'

const movimentacaoStore = useMovimentacaoStore()
const categoriaStore = useCategoriaStore()
const contaStore = useContaStore()

const operacao = ref('')

onMounted(async () => {
  await Promise.all([
    contaStore.sincronizarContas(),
    categoriaStore.sincronizarCategorias(),
    movimentacaoStore.sincronizarMovimentacoes()
  ])
})
</script>
<style scoped></style>
