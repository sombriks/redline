<template>
  <v-card elevation="24" title="Nova movimentação">
    <v-form v-model="valid" @submit.prevent.stop="salvarMovimentacao">
      <v-container>
        <v-row align="center">
          <!-- tipo de movimentação (entrada / saída) -->
          <v-radio-group v-model="novaMovimentacao.tipo_movimentacao_id" inline>
            <template v-slot:label>
              <div>Tipo de movimentação</div>
            </template>
            <v-radio :value="1" label="Entrada"></v-radio>
            <v-radio :value="2" label="Saída"></v-radio>
          </v-radio-group>
        </v-row>
        <v-row align="center">
          <!-- valor -->
        </v-row>
        <v-row align="center">
          <!-- efetivada (data) -->
        </v-row>
        <v-row align="center">
          <!-- categoria -->
        </v-row>
        <v-row align="center">
          <!-- descrição -->
        </v-row>
        <v-row align="center">
          <!-- conta -->
        </v-row>
        <v-row align="center">
          <!-- vencimento (dia do cartão se conta cartão, livre se conta bancária, o mesmo que efetivada se conta carteira) -->
        </v-row>
        <v-row align="center">
          <!-- recorrência (painel estendido) pra criar recorrência // criar depois //-->
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>
<script setup>
import { useMovimentacaoStore } from '@/stores/movimentacaoStore'
import { onMounted, reactive, ref } from "vue";
import { useContaStore } from '@/stores/contaStore'
import { useCategoriaStore } from '@/stores/categoriaStore'

const contaState = useContaStore()
const categoriaState = useCategoriaStore()
const movimentacaoState = useMovimentacaoStore()

const reset = () => ({
  descricao: '',
  valor: 0,
  criacao: new Date(),
  alteracao: new Date(),
  vencimento: new Date(),
  efetivada: new Date(),
  tipo_movimentacao_id: 2,
  conta_id: null,
  categoria_id: null,
  recorrencia_id: null
})

const novaMovimentacao = reactive(reset())

const valid = ref(false)

const sync = async () => {
  await contaState.sincronizarContas()
  await categoriaState.sincronizarCategorias()
  await movimentacaoState.sincronizarMovimentacoes()
}

const salvarMovimentacao = async () => {
  await movimentacaoState.salvarMovimentacao(novaMovimentacao)
  await sync()
  Object.assign(novaMovimentacao, reset())
}

onMounted(sync)
</script>
