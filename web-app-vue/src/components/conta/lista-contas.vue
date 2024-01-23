<template>
  <v-container fluid>
    <v-row align="center">
      <detalhe-conta :conta="novaConta" @onSave="saveConta"></detalhe-conta>
      <v-btn
        variant="outlined"
        rounded="rounded-circle"
        @click="drawer = !drawer"
        icon="mdi-dots-vertical"
      ></v-btn>
      <v-divider></v-divider>
      <detalhe-conta
        v-for="c in contas"
        :key="c.id"
        :conta="c"
        @onSave="saveConta"
        @onRemove="removeConta"
      ></detalhe-conta>
    </v-row>
  </v-container>
  <v-navigation-drawer
      v-model="drawer"
      location="bottom"
      temporary
  >
    <v-radio-group v-model="filtroTipo" inline>
      <template v-slot:label>
        <div>Exibir</div>
      </template>
      <v-radio :value="1" label="Carteiras"></v-radio>
      <v-radio :value="2" label="Bancos"></v-radio>
      <v-radio :value="3" label="Cartões"></v-radio>
      <v-radio :value="-1" label="Tudo"></v-radio>
    </v-radio-group>
  </v-navigation-drawer>
</template>
<script setup>
import { useContaStore } from '@/stores/contaStore'
import { computed, onMounted, reactive, ref } from 'vue'
import DetalheConta from '@/components/conta/detalhe-conta.vue'

const cState = useContaStore()

const drawer = ref(false)

const novaConta = reactive({ descricao: 'Nova conta' })

const filtroTipo = ref(-1)

const contas = computed(() =>
  cState.store.contas.filter((c) => {
    if (filtroTipo.value == -1) return true
    else return c.tipo_conta_id == filtroTipo.value
  })
)

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
