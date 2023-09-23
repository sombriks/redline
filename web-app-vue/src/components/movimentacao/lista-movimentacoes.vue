<template>
  <v-container fluid  style="width: 100%;">
    <v-row align="center">
      <h1>Histórico</h1>
    </v-row>
    <v-row align="center">
      <v-btn variant="outlined" rounded @click="drawer = !drawer" size="large">
        <v-icon icon="mdi-dots-vertical"/>
      </v-btn>
      <v-divider></v-divider>
    </v-row>
    <v-row align="center" v-for="movimentacao in movimentacoes" :key="movimentacao.id">
      <detalhe-movimentacao :movimentacao="movimentacao"/>
    </v-row>
  </v-container>
  <!--  <v-list min-width="300px">-->
  <!--    <v-list-item v-for="movimentacao in movimentacoes" :key="movimentacao.id">-->
  <!--      <v-list-item-title>-->
  <!--        &lt;!&ndash; TODO criar o detalhe movimentação agora &ndash;&gt;-->
  <!--        &lt;!&ndash;        <v-chip class="ma-2" variant="outlined" rounded>{{ ajeitaData(movimentacao.vencimento) }}</v-chip>&ndash;&gt;-->
  <!--&lt;!&ndash;        <v-spacer></v-spacer>&ndash;&gt;-->
  <!--      </v-list-item-title>-->
  <!--    </v-list-item>-->
  <!--  </v-list>-->
  <v-navigation-drawer
      v-model="drawer"
      location="bottom"
      temporary
  >
  </v-navigation-drawer>
</template>
<script setup>
import {computed, onMounted, ref} from 'vue'
import {useMovimentacaoStore} from '@/stores/movimentacaoStore'
import DetalheMovimentacao from '@/components/movimentacao/detalhe-movimentacao.vue'

const mState = useMovimentacaoStore()

const drawer = ref(false)

const onRemove = async (movimentacao) => {
  if (!confirm('Deseja realmente remover esta movimentação?')) return
  await mState.excluirMovimentacao(movimentacao)
  await mState.sincronizarMovimentacoes()
}

const onUpdate = async (movimentacao) => {
  await mState.salvarMovimentacao(movimentacao)
  await mState.sincronizarMovimentacoes()
}

const movimentacoes = computed(() => mState.store?.movimentacoes.map((m) => m) || [])

const ajeitaData = (d) => {
  return d.split("T")[0]
}

onMounted(() => {
  mState.sincronizarMovimentacoes()
})
</script>
<style scoped></style>
