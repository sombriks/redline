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
        <v-icon icon="mdi-dots-vertical"/>
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
  <v-navigation-drawer v-model="drawer" location="bottom" :width="sheetHeight">
    <v-form @submit.prevent="aplicarFiltro">
      <v-container>
        <v-row align="center">
          <v-radio-group inline v-model="filtro.tipo_movimentacao_id">
            <template v-slot:label>
              <div>Tipo de movimentação</div>
            </template>
            <v-radio :value="null" label="Tudo"></v-radio>
            <v-radio :value="1" label="Entrada"></v-radio>
            <v-radio :value="2" label="Saída"></v-radio>
          </v-radio-group>
        </v-row>
        <v-row align="center">
          <v-radio-group inline v-model="filtro.limit">
            <template v-slot:label>
              <div>Máximo de resultados</div>
            </template>
            <v-radio :value="1000" label="1000"></v-radio>
            <v-radio :value="50" label="50"></v-radio>
            <v-radio :value="5" label="5"></v-radio>
          </v-radio-group>
        </v-row>
        <v-row align="center">
          <button-date label="Data inicial" v-model="filtro.dataInicio"></button-date>
          <button-date label="Data final" v-model="filtro.dataFim"></button-date>
        </v-row>
        <v-row align="center">
        </v-row>
        <v-row align="center">
          <v-btn class="ma-2" color="green" type="submit" icon="mdi-check"></v-btn>
          <v-spacer></v-spacer>
          <v-btn
              variant="tonal"
              color="orange"
              class="ma-2"
              type="button"
              @click="drawer = !drawer"
              icon="mdi-close"
          ></v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-navigation-drawer>
</template>
<script setup>
import {computed, onMounted, reactive, ref} from 'vue'
import {useMovimentacaoStore} from '@/stores/movimentacaoStore'
import DetalheMovimentacao from '@/components/movimentacao/detalhe-movimentacao.vue'
import ButtonDate from "@/components/shared/button-date.vue";

const movimentacaoStore = useMovimentacaoStore()

const drawer = ref(false)

const filtro = reactive({
  tipo_movimentacao_id: null,
  limit: 1000,
  dataInicio: null,
  dataFim: null
})

const movimentacoes = computed(() => movimentacaoStore.store?.movimentacoes.map((m) => m) || [])

onMounted(() => {
  movimentacaoStore.sincronizarMovimentacoes()
  Object.assign(filtro, movimentacaoStore.store.filtrosMovimentacao)
})

const sheetHeight = computed(() => window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth)

const aplicarFiltro = () => {
  console.log("filtro!")
  movimentacaoStore.aplicarFiltro(filtro)
  movimentacaoStore.sincronizarMovimentacoes()
  drawer.value = false

}

</script>
<style scoped></style>
