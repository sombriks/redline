<template>
  <v-container fluid>
    <v-row align="center">
      <v-form v-model="valid">
        <div class="column">
          <conta-autocomplete
            class="item"
            label="Conta de origem"
            v-model="formPagamento.contaOrigem"
            :rules="[requiredRule]"
          />
          <conta-autocomplete
            class="item"
            label="Conta de destino"
            v-model="formPagamento.contaDestino"
            :rules="[requiredRule]"
          />
          <chip-date
            class="item"
            label="Data pagamento"
            v-model="formPagamento.vencimento"
          />
          <chip-periodo
            label="Período"
            v-model:inicial="formPagamento.inicial"
            v-model:final="formPagamento.final"
          ></chip-periodo>
          <v-divider />
          <p>valor total das movimentações do período</p>
          <!-- movimentações do período -->
          <v-divider />
          <div class="item row">
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
              color="orange"
              class="ma-2"
              type="button"
              @click="router.push('/historico')"
              icon="mdi-close"
            ></v-btn>
          </div>
        </div>
      </v-form>
    </v-row>
  </v-container>
  <div>
    <h1>Pagamento</h1>
    <ol>
      <li>selecionar uma conta de origem</li>
      <li>selecionar uma conta de destino</li>
      <li>definir um período</li>
      <li>marcar as movimentações do período para pagamento; calcular o valor</li>
      <li>salvar o movimento de origem</li>
      <li>salvar o movimento de destino</li>
      <li>atualizar as movimentações- marcar como pagas</li>
    </ol>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { requiredRule } from '@/services/basic-rules'
import ContaAutocomplete from '@/shared/conta-autocomplete.vue'
import ChipPeriodo from '@/shared/chip-periodo.vue'
import { endOfMonth, startOfMonth } from 'date-fns'
import ChipDate from '@/shared/chip-date.vue'
import { router } from '@/services/router'

const valid = ref(false)
const formPagamento = reactive({
  contaOrigem: 0,
  contaDestino: 0,
  valor: 0,
  vencimento: new Date(),
  inicial: startOfMonth(new Date()),
  final: endOfMonth(new Date())
})
</script>
<style scoped>
.column {
  display: flex;
  flex-direction: column;
}

.item {
  margin: 5px;
}

.row {
  display: flex;
  flex-direction: row;
}
</style>
