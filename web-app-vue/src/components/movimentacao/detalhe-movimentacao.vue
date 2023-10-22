<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      <v-chip variant="outlined" class="ma-1" rounded size="large">
        {{ parseISO(props.movimentacao.vencimento).toLocaleDateString() }}
      </v-chip>
      <v-chip
        variant="outlined"
        class="ma-1"
        rounded
        size="large"
        :color="props.movimentacao.tipo_movimentacao_id === 1 ? 'green' : 'red'"
      >
        R$ {{ movimentacao.valor }}
      </v-chip>
      <v-spacer></v-spacer>
      <v-chip
        variant="outlined"
        class="ma-1"
        rounded
        size="large"
        :title="props.movimentacao.efetivada || 'Pagamento pendente'"
        :color="!!props.movimentacao.efetivada ? 'green' : 'red'"
      >
        <v-icon :icon="!!props.movimentacao.efetivada ? 'mdi-check' : 'mdi-close'" />
      </v-chip>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-chip v-if="conta" variant="outlined" class="ma-1" rounded size="large" :color="conta.cor">
        {{ conta.descricao }}
      </v-chip>
      <v-chip
        v-if="categoria"
        variant="outlined"
        class="ma-1"
        rounded
        size="large"
        :color="categoria.cor"
        >{{ categoria.descricao }}
      </v-chip>
      <v-chip variant="outlined" class="ma-1" rounded size="large">
        {{ props.movimentacao.descricao }}
      </v-chip>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
<script setup>
import { parseISO } from 'date-fns'
import { ref, watchEffect } from 'vue'
import { useContaStore } from '@/stores/contaStore'
import { useCategoriaStore } from '@/stores/categoriaStore'

const props = defineProps(['movimentacao'])

const contaStore = useContaStore()
const categoriaStore = useCategoriaStore()

const conta = ref(null)
const categoria = ref(null)

watchEffect(() => {
  if (props.movimentacao) {
    conta.value = contaStore.store.contas
      .find((c) => c.id === props.movimentacao.conta_id)
    categoria.value = categoriaStore.store.categorias
      .find((c) => c.id === props.movimentacao.categoria_id
    )
  }
})
</script>
