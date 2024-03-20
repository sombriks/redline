<template>
  <v-chip
    v-if="!edit"
    rounded
    variant="outlined"
    :color="props.recorrencia?.cor || 'green-accent-2'"
    class="ma-2"
    size="x-large"
    :append-icon="props.recorrencia?.id ? 'mdi-playlist-edit' : 'mdi-playlist-plus'"
    @click="edit = !edit"
  >
    {{ props.recorrencia?.descricao || 'Nova recorrência' }}
  </v-chip>
  <v-card v-if="edit" elevation="24" min-width="300">
    <v-form v-model="valid" @submit.prevent.stop="doSave">
      <v-container>
        <v-color-picker v-model="rec.cor"></v-color-picker>
        <v-text-field
          :rules="[requiredRule]"
          v-model="rec.descricao"
          label="Descrição"
        ></v-text-field>
        <categoria-autocomplete v-model="rec.categoria_id" />
        <v-select
          v-model="rec.tipo_recorrencia_id"
          :items="recorrenciaStore.store.tiposRecorrencia"
          item-title="descricao"
          item-value="id"
          prepend-inner-icon="mdi-repeat-variant"
        >
        </v-select>
        <button-date label="Início" v-model="rec.inicial"></button-date>
        <button-date label="Fim" v-model="rec.final"></button-date>
        <v-text-field
          class="item"
          :rules="[requiredRule, minValueRule(1)]"
          type="number"
          v-model="valor"
          label="Valor"
          prepend-inner-icon="mdi-cash-100"
        />
        <v-row align="center">
          <v-radio-group v-model="divide" inline>
            <v-radio :value="true" label="Dividir valor"></v-radio>
            <v-radio :value="false" label="Repetir valor"></v-radio>
          </v-radio-group>
        </v-row>
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
import ButtonDate from '@/shared/button-date.vue'
import { useRecorrenciaStore } from '@/stores/recorrenciaStore'
import { prepareDate, prepareMoney } from '@/services/formaters'
import CategoriaAutocomplete from '@/shared/categoria-autocomplete.vue'

const recorrenciaStore = useRecorrenciaStore()

const props = defineProps(['recorrencia'])
const emit = defineEmits(['onSave', 'onCancel', 'onDel'])

const edit = ref(false)
const valid = ref(false)

const reset = () => ({
  ...(props.recorrencia || {
    tipo_recorrencia_id: 1,
    inicial: startOfMonth(new Date()),
    final: endOfMonth(new Date()),
    categoria_id: null,
    valorTotal: 0,
    descricao: '',
    divide: true,
    parcelas: 1,
    cor: '#f00'
  })
})

const rec = reactive(reset())

const valor = computed({
  get() {
    return rec.divide ? rec.valorTotal / rec.parcelas : rec.valorTotal
  },
  set(val) {
    rec.valorTotal = rec.divide ? val * rec.parcelas : val
  }
})

const parcelas = computed({
  get() {
    if (rec.tipo_recorrencia_id == 1)
      return 1 + differenceInMonths(prepareDate(rec.final), prepareDate(rec.inicial)) // mensal
    else if (rec.tipo_recorrencia_id == 2)
      return 1 + differenceInYears(prepareDate(rec.final), prepareDate(rec.inicial)) // anual
    else return 1 + differenceInDays(prepareDate(rec.final), prepareDate(rec.inicial)) // diária
  }
})

const resultado = computed(() => {
  return rec.divide
    ? `${parcelas.value}x de ${prepareMoney(valor.value / parcelas.value)}`
    : `${prepareMoney(valor.value * parcelas.value)} em ${parcelas.value}x`
})

const divide = computed({
  get() {
    return !!rec.divide
  },
  set(val) {
    rec.divide = val
  }
})

const doSave = async () => {
  if (!valid.value) return
  rec.parcelas = parcelas.value
  emit('onSave', rec)
  edit.value = false
  if (!rec.id) {
    Object.assign(rec, reset())
  }
}

const doCancel = async () => {
  edit.value = false
  emit('onCancel')
  Object.assign(rec, reset())
}

const doDel = async () => {
  emit('onDel', rec)
  Object.assign(rec, reset())
}
</script>
