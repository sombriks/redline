<template>
  <v-container>
    <v-row align="center">
      <detalhe-conta :conta="novaConta" @onSave="saveConta"></detalhe-conta>
      <v-divider></v-divider>
      <detalhe-conta
        v-for="c in cState.store.contas"
        :key="c.id"
        :conta="c"
        @onSave="saveConta"
        @onRemove="removeConta"
      ></detalhe-conta>
    </v-row>
  </v-container>
  <!--  <ul v-if="cState.store.contas && cState.store.contas.length">-->
  <!--    <detalhe-conta-->
  <!--      v-for="conta in contas"-->
  <!--      :key="conta.id"-->
  <!--      :conta="conta"-->
  <!--      @onUpdate="saveConta"-->
  <!--      @onRemove="removeConta"-->
  <!--    ></detalhe-conta>-->
  <!--  </ul>-->
  <!--  <div v-else>Não há contas para visualizar</div>-->
</template>
<script setup>
import { useContaStore } from '@/stores/contaStore'
import { onMounted, reactive } from 'vue'
import DetalheConta from '@/components/conta/detalhe-conta.vue'

const cState = useContaStore()

const novaConta = reactive({ descricao: 'Nova conta' })

onMounted(() => {
  cState.sincronizarContas()
})

const saveConta = (conta) => {
  cState.salvarConta(conta)
  cState.sincronizarContas()
}

const removeConta = (conta) => {
  if (confirm('confirmar deletar conta?')) cState.removeConta(conta)
  cState.sincronizarContas()
}
</script>
<style scoped></style>
