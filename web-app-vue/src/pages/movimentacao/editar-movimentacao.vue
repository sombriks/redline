<template>
  <v-card elevation="24" :title="`Editar movimentação #${props.movimentacao.id}`">
    <v-form v-model="valid" @submit.prevent.stop="salvarMovimentacao">
      <v-container>
        <v-row align="center">
          <!--  movEdit.tipo_movimentacao_id-->
          <v-radio-group v-model="movEdit.tipo_movimentacao_id" inline>
            <v-radio :value="1" label="Entrada"></v-radio>
            <v-radio :value="2" label="Saída"></v-radio>
          </v-radio-group>
        </v-row>
        <v-row align="center">
          <!--  movEdit.valor-->
          <v-text-field
            :rules="[requiredRule, numberRule]"
            type="number"
            v-model="movEdit.valor"
            label="Valor"
            prepend-inner-icon="mdi-cash-100"
          ></v-text-field>
        </v-row>
        <v-row align="center">
          <!--  movEdit.descricao-->
          <v-text-field
            :rules="[requiredRule]"
            v-model="movEdit.descricao"
            label="Descrição"
          ></v-text-field>
        </v-row>
        <v-row align="center">
          <!--  movEdit.conta_id-->
          <conta-autocomplete v-model="movEdit.conta_id" :rules="[requiredRule]" />
        </v-row>
        <v-row align="center">
          <!--  movEdit.categoria_id-->
          <categoria-autocomplete v-model="movEdit.categoria_id" />
        </v-row>
        <v-row align="center">
          <!-- movEdit.vencimento -->
          <chip-date label="Vencimento" v-model="movEdit.vencimento"></chip-date>
        </v-row>
        <v-row align="center">
          <!-- movEdit.efetivada -->
          <chip-date label="Efetivada" v-model="movEdit.efetivada"></chip-date>
        </v-row>
        <!--  movEdit.criacao-->
        <!--  movEdit.alteracao-->
        <!--  movEdit.recorrencia_id-->
        <v-row align="center">
          <v-btn
            variant="outlined"
            class="ma-2"
            color="green"
            type="submit"
            icon="mdi-check"
          ></v-btn>
          <v-btn
            variant="outlined"
            color="orange"
            class="ma-2"
            type="button"
            @click="router.push('/historico')"
            icon="mdi-close"
          ></v-btn>
          <v-spacer></v-spacer>
          <v-btn
            variant="outlined"
            color="red"
            class="ma-2"
            type="button"
            @click="excluirMovimentacao"
            icon="mdi-trash-can-outline"
          ></v-btn>
        </v-row>
      </v-container>
    </v-form>
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
const movimentacaoStore = useMovimentacaoStore()

const props = defineProps(['movimentacao'])

const movEdit = reactive({ ...props.movimentacao })

const valid = ref(false)

const salvarMovimentacao = async () => {
  if (!valid.value) return
  await movimentacaoStore.salvarMovimentacao(movEdit)
  await router.push('/historico')
}

const excluirMovimentacao = async () => {
  if (confirm(`Deseja realmente excluir a movimentação #${props.movimentacao.id}`)) {
    await movimentacaoStore.excluirMovimentacao(props.movimentacao)
    await router.push('/historico')
  }
}
</script>
<style scoped></style>
