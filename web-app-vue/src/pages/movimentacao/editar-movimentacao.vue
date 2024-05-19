<template>
  <v-card
    elevation="24"
    min-width="320"
    :title="
      props?.movimentacao?.id
        ? `Editar movimentação #${props.movimentacao.id}`
        : 'Nova movimentação'
    "
  >
    <v-card-text>
      <v-form v-model="valid" @submit.prevent.stop="salvarMovimentacao">
        <div class="column">
          <!-- tipo de movimentação (entrada / saída) -->
          <v-radio-group class="item" v-model="movForm.tipo_movimentacao_id" inline>
            <v-radio :value="1" label="Entrada"></v-radio>
            <v-radio :value="2" label="Saída"></v-radio>
          </v-radio-group>
          <!-- valor -->
          <v-text-field
            class="item"
            :rules="[requiredRule, numberRule]"
            type="number"
            v-model="movForm.valor"
            label="Valor"
            prepend-inner-icon="mdi-cash-100"
          />
          <!--  movEdit.categoria_id-->
          <categoria-autocomplete class="item" v-model="movForm.categoria_id" />
          <!--  movEdit.conta_id-->
          <conta-autocomplete class="item" v-model="movForm.conta_id" :rules="[requiredRule]" />
          <!--  movEdit.descricao-->
          <v-text-field
            class="item"
            :rules="[requiredRule]"
            v-model="movForm.descricao"
            label="Descrição"
          />
          <!-- efetivada? -->
          <v-checkbox
            v-if="!props?.movimentacao?.id"
            class="item"
            v-model="contaEfetivada"
            label="Paga?"
          />
          <!-- vencimento (dia do cartão se conta cartão) -->
          <chip-date class="item" label="Vencimento" v-model="movForm.vencimento" />
          <!-- efetivada (data) -->
          <chip-date
            v-if="contaEfetivada || props?.movimentacao?.id"
            class="item"
            label="Efetivada"
            v-model="movForm.efetivada"
          />
          <!-- recorrência (painel estendido) pra criar recorrência // criar depois //-->
          <v-divider />
          <div class="item row">
            <v-btn
              variant="outlined"
              class="ma-2"
              color="green"
              type="submit"
              icon="mdi-check"
            ></v-btn>
            <v-spacer v-if="!props?.movimentacao?.id"></v-spacer>
            <v-btn
              variant="outlined"
              color="orange"
              class="ma-2"
              type="button"
              @click="router.push('/historico')"
              icon="mdi-close"
            ></v-btn>
            <v-spacer v-if="props?.movimentacao?.id"></v-spacer>
            <v-btn
              variant="outlined"
              color="red"
              class="ma-2"
              type="button"
              @click="excluirMovimentacao"
              icon="mdi-trash-can-outline"
            ></v-btn>
          </div>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useMovimentacaoStore } from '@/stores/movimentacaoStore'
import { numberRule, requiredRule } from '@/services/basic-rules'
import ContaAutocomplete from '@/pages/shared/conta-autocomplete.vue'
import CategoriaAutocomplete from '@/pages/shared/categoria-autocomplete.vue'
import { useRouter } from 'vue-router'
import ChipDate from '@/pages/shared/chip-date.vue'

const router = useRouter()
const props = defineProps(['movimentacao'])

const movimentacaoStore = useMovimentacaoStore()

const movForm = reactive({ ...props.movimentacao })

const valid = ref(false)

const salvarMovimentacao = async () => {
  if (!valid.value) return
  await movimentacaoStore.salvarMovimentacao(movForm)
  await router.push('/historico')
}

const excluirMovimentacao = async () => {
  if (confirm(`Deseja realmente excluir a movimentação #${props.movimentacao.id}`)) {
    await movimentacaoStore.excluirMovimentacao(props.movimentacao)
    await router.push('/historico')
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
