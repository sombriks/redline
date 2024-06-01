<template>
  <v-chip
    v-if="mode === 0"
    rounded
    variant="outlined"
    :color="props.recorrencia?.cor || 'green-accent-2'"
    class="ma-2"
    size="x-large"
    :prepend-icon="
      props.recorrencia?.id
        ? props.recorrencia?.tipo_movimentacao_id == 1
          ? 'mdi-cash-plus'
          : 'mdi-cash-minus'
        : 'mdi-cash'
    "
    :append-icon="props.recorrencia?.id ? 'mdi-playlist-edit' : 'mdi-playlist-plus'"
    @click="!props.recorrencia?.id ? (mode = 2) : mode++"
  >
    <span v-if="mode === 0">{{ compacto }}</span>
    <span v-if="mode === 1">{{ descricao }}</span>
  </v-chip>
  <v-card
    v-if="mode === 1"
    variant="outlined"
    rounded="xl"
    class="ma-2"
    :title="compacto"
    :color="props.recorrencia?.cor || 'green-accent-2'"
    :prepend-icon="
      props.recorrencia?.id
        ? props.recorrencia?.tipo_movimentacao_id == 1
          ? 'mdi-cash-plus'
          : 'mdi-cash-minus'
        : 'mdi-cash'
    "
    :append-icon="props.recorrencia?.id ? 'mdi-playlist-edit' : 'mdi-playlist-plus'"
    @click="!props.recorrencia?.id ? (mode = 2) : mode++"
  >
    <v-card-text>{{ descricao }} - {{ periodo }}</v-card-text>
  </v-card>
  <v-card v-if="mode === 2" elevation="24" min-width="300" class="ma-2">
    <v-form v-model="valid" @submit.prevent.stop="doSave">
      <v-container>
        <v-color-picker v-model="rec.cor"></v-color-picker>
        <v-row align="center">
          <!--  movEdit.tipo_movimentacao_id-->
          <v-radio-group v-model="rec.tipo_movimentacao_id" inline>
            <v-radio :value="1" label="Entrada"></v-radio>
            <v-radio :value="2" label="Saída"></v-radio>
          </v-radio-group>
        </v-row>
        <v-text-field
          :rules="[requiredRule]"
          v-model="rec.descricao"
          label="Descrição"
        ></v-text-field>
        <categoria-autocomplete v-model="rec.categoria_id" />
        <conta-autocomplete :rules="[requiredRule]" v-model="rec.conta_id" />
        <v-select
          v-model="rec.tipo_recorrencia_id"
          :items="recorrenciaStore.store.tiposRecorrencia"
          item-title="descricao"
          item-value="id"
          prepend-inner-icon="mdi-repeat-variant"
        >
        </v-select>
        <chip-periodo
          v-model:inicial="rec.inicial"
          v-model:final="rec.final"
          reset="anual"
        ></chip-periodo>
        <v-text-field
          class="item"
          :rules="[requiredRule, minValueRule(1)]"
          type="number"
          v-model="rec.valorParcela"
          label="Valor parcela"
          prepend-inner-icon="mdi-cash-100"
        />
        <p>{{ resultado }}</p>
        <br />
        <v-row align="center">
          <v-btn
            variant="outlined"
            class="ma-2"
            color="green"
            type="submit"
            icon="mdi-check"
          ></v-btn>
          <v-spacer v-if="!rec?.id"></v-spacer>
          <v-btn
            variant="outlined"
            color="orange"
            class="ma-2"
            type="button"
            @click="doCancel"
            icon="mdi-close"
          ></v-btn>
          <v-spacer v-if="rec?.id"></v-spacer>
          <v-btn
            v-if="rec?.id"
            variant="outlined"
            color="red"
            class="ma-2"
            type="button"
            @click="doDel"
            icon="mdi-trash-can-outline"
          ></v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>
<script setup>
import { computed, reactive, ref } from 'vue'
import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  endOfMonth,
  startOfMonth
} from 'date-fns'
import { minValueRule, requiredRule } from '@/services/basic-rules'
import { prepareDate, prepareMoney } from '@/services/formaters'
import CategoriaAutocomplete from '@/shared/categoria-autocomplete.vue'
import { useRecorrenciaStore } from '@/stores/recorrenciaStore'
import { useCategoriaStore } from '@/stores/categoriaStore'
import ContaAutocomplete from '@/shared/conta-autocomplete.vue'
import ChipPeriodo from '@/shared/chip-periodo.vue'

const recorrenciaStore = useRecorrenciaStore()
const categoriaStore = useCategoriaStore()

const props = defineProps(['recorrencia'])
const emit = defineEmits(['onSave', 'onCancel', 'onDel'])

const mode = ref(0)
const valid = ref(false)

const reset = () => ({
  ...(props.recorrencia || {
    tipo_recorrencia_id: 1,
    inicial: startOfMonth(new Date()),
    final: endOfMonth(new Date()),
    tipo_movimentacao_id: 2,
    categoria_id: null,
    conta_id: null,
    valorParcela: 0,
    descricao: '',
    parcelas: 1,
    cor: '#f00'
  })
})

const rec = reactive(reset())

const parcelas = computed(() => {
  if (rec.tipo_recorrencia_id == 1)
    return 1 + differenceInMonths(prepareDate(rec.final), prepareDate(rec.inicial)) // mensal
  else if (rec.tipo_recorrencia_id == 2)
    return 1 + differenceInYears(prepareDate(rec.final), prepareDate(rec.inicial)) // anual
  else return 1 + differenceInDays(prepareDate(rec.final), prepareDate(rec.inicial)) // diária
})

const categoria = computed(() => {
  if (rec.categoria_id) return categoriaStore.store.categorias.find((c) => c.id == rec.categoria_id)
  return { descricao: '' }
})

const compacto = computed(() => {
  if (rec.id) return `${parcelas.value}x de ${prepareMoney(rec.valorParcela)}`
  return 'Nova recorrência'
})

const descricao = computed(() => {
  if (rec.id) return `${rec.descricao} (${categoria.value.descricao}) | ${resultado.value}`
  return 'Nova recorrência'
})

const periodo = computed(() => {
  return `${prepareDate(rec.inicial).toLocaleDateString()} a ${prepareDate(
    rec.final
  ).toLocaleDateString()}`
})

const resultado = computed(() => {
  return `${parcelas.value}x de ${prepareMoney(rec.valorParcela)} (${
    recorrenciaStore.store.tiposRecorrencia.find((tr) => tr.id == rec.tipo_recorrencia_id)
      ?.descricao
  })`
})

const doSave = async () => {
  if (!valid.value) return
  rec.parcelas = parcelas.value
  emit('onSave', rec)
  mode.value = 0
  if (!rec.id) {
    Object.assign(rec, reset())
  }
}

const doCancel = async () => {
  mode.value = 0
  emit('onCancel')
  Object.assign(rec, reset())
}

const doDel = async () => {
  mode.value = 0
  emit('onDel', rec)
  Object.assign(rec, reset())
}
</script>
<style scoped>
</style>
