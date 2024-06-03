<template>
  <v-container fluid>
    <v-radio-group inline label="Operação" v-model="operacao">
      <v-radio label="Pagamento" value="pagamento"></v-radio>
      <v-radio label="Transferência" value="transferencia"></v-radio>
    </v-radio-group>
    <pagamento-form v-if="operacao === 'pagamento'"></pagamento-form>
    <transferencia-form v-if="operacao === 'transferencia'"></transferencia-form>

  </v-container>

<!--  <div>-->
<!--    <h1>Pagamento</h1>-->
<!--    <ol>-->
<!--      <li>selecionar uma conta de origem</li>-->
<!--      <li>selecionar uma conta de destino</li>-->
<!--      <li>definir um período</li>-->
<!--      <li>marcar as contas do período para pagamento</li>-->
<!--    </ol>-->
<!--  </div>-->
</template>
<script setup>
import { ref } from 'vue'
import PagamentoForm from '@/pages/pagamento/pagamento-form.vue'
import TransferenciaForm from '@/pages/pagamento/transferencia-form.vue'

const operacao = ref("")

</script>
<style scoped>
</style>
