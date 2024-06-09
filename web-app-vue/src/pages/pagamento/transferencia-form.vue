<template>
  <v-container fluid>
    <v-row align="center">
      <v-form v-model="valid" @submit.prevent.stop="transferir">
        <div class="column">
          <categoria-autocomplete
            class="item"
            label="Categoria da transferência"
            v-model="formTransferencia.categoria"
            :rules="[requiredRule]"
          />
          <conta-autocomplete
            class="item"
            label="Conta de origem"
            v-model="formTransferencia.contaOrigem"
            :rules="[requiredRule]"
          />
          <conta-autocomplete
            class="item"
            label="Conta de destino"
            v-model="formTransferencia.contaDestino"
            :rules="[requiredRule]"
          />
          <v-text-field
            class="item"
            :rules="[requiredRule, numberRule]"
            type="number"
            v-model="formTransferencia.valor"
            label="Valor"
            prepend-inner-icon="mdi-cash-100"
          />
          <chip-date
            class="item"
            label="Data transferência"
            v-model="formTransferencia.vencimento"
          />
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
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { numberRule, requiredRule } from '@/services/basic-rules'
import ContaAutocomplete from '@/shared/conta-autocomplete.vue'
import ChipDate from '@/shared/chip-date.vue'
import { useMovimentacaoStore } from '@/stores/movimentacaoStore'
import CategoriaAutocomplete from '@/shared/categoria-autocomplete.vue'

const router = useRouter()
const movimentacaoStore = useMovimentacaoStore()

const valid = ref(false)
const formTransferencia = reactive({
  contaOrigem: 0,
  contaDestino: 0,
  categoria: 0,
  valor: 0,
  vencimento: Date.now()
})

const transferir = async () => {
  try {
    if (!valid.value) return console.log('invalid form state')
    await movimentacaoStore.transferir({ ...formTransferencia })
    alert('transferência criada com sucesso')
    await router.push('/historico')
  } catch (e) {
    console.log(e)
    alert('Não foi possível realizar a transferência')
  }
}
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
