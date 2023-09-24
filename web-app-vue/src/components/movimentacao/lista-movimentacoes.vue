<template>
  <v-container fluid style="width: 100%">
    <v-row align="center">
      <h1>Histórico</h1>
    </v-row>
    <v-row align="center">
      <v-chip
        variant="outlined"
        class="ma-2"
        rounded
        size="large"
        color="green-accent-2"
        prepend-icon="mdi-currency-usd"
        append-icon="mdi-playlist-plus"
        @click="$router.push('/nova-movimentacao')"
      >
        Nova movimentação
      </v-chip>
      <v-btn variant="outlined" rounded @click="drawer = !drawer" size="large">
        <v-icon icon="mdi-dots-vertical" />
      </v-btn>
      <v-divider thickness="5"></v-divider>
    </v-row>
    <v-row align="center">
      <v-expansion-panels>
        <detalhe-movimentacao
          v-for="movimentacao in movimentacoes"
          :key="movimentacao.id"
          :movimentacao="movimentacao"
        />
      </v-expansion-panels>
    </v-row>
  </v-container>
  <v-navigation-drawer v-model="drawer" location="bottom" temporary> </v-navigation-drawer>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useMovimentacaoStore } from '@/stores/movimentacaoStore'
import DetalheMovimentacao from '@/components/movimentacao/detalhe-movimentacao.vue'

const mState = useMovimentacaoStore()

const drawer = ref(false)

const movimentacoes = computed(() => mState.store?.movimentacoes.map((m) => m) || [])

onMounted(() => {
  mState.sincronizarMovimentacoes()
})
</script>
<style scoped></style>
