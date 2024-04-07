<template>
  <v-container fluid>
    <v-row align="center">
      <chip-periodo v-model:inicial="inicio" v-model:final="fim"></chip-periodo>
    </v-row>
    <v-row align="center">
      <conta-autocomplete v-model="contaId"></conta-autocomplete>
    </v-row>
    <v-row align="center">
      <categoria-autocomplete v-model="categoriaId"></categoria-autocomplete>
    </v-row>
    <v-row align="center">
      <v-table>
        <thead>
        <tr>
          <th></th>
          <th>Entradas</th>
          <th>Saídas</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Total</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Efetivado</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Contas</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Categorias</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Planejamentos</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Período</td>
          <td></td>
          <td></td>
        </tr>
        </tbody>
      </v-table>
    </v-row>
  </v-container>

</template>
<style scoped></style>
<script setup>
import ChipPeriodo from '@/shared/chip-periodo.vue'
import { endOfMonth, startOfMonth } from 'date-fns'
import { ref } from 'vue'
import ContaAutocomplete from '@/shared/conta-autocomplete.vue'
import CategoriaAutocomplete from '@/shared/categoria-autocomplete.vue'

const inicio = ref(startOfMonth(new Date()))
const fim = ref(endOfMonth(new Date()))

const contaId = ref()
const categoriaId = ref()

</script>
