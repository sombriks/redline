<template>
  <v-chip
    v-if="!edit"
    rounded
    variant="outlined"
    :color="categoria.cor || 'green-accent-2'"
    :prepend-icon="
      planejamento?.tipo_movimentacao_id == 1
        ? 'mdi-cash-plus'
        : planejamento?.tipo_movimentacao_id == 2
        ? 'mdi-cash-minus'
        : 'mdi-cash'
    "
    :append-icon="planejamento?.id ? 'mdi-playlist-edit' : 'mdi-playlist-plus'"
    class="ma-2"
    size="x-large"
    @click="edit = true"
  >
    {{ planejamento?.id ? descricao : 'Novo planejamento' }}
  </v-chip>
  <v-card v-if="edit" elevation="24" min-width="300">
    <v-form v-model="valid" @submit.prevent.stop="doSave">
      <v-container>
        <v-row align="center">
          <!--  movEdit.tipo_movimentacao_id-->
          <v-radio-group v-model="plan.tipo_movimentacao_id" inline>
            <v-radio :value="1" label="Entrada"></v-radio>
            <v-radio :value="2" label="Saída"></v-radio>
          </v-radio-group>
        </v-row>
        <v-row align="center">
          <categoria-autocomplete v-model="plan.categoria_id" />
        </v-row>
        <v-row align="center">
          <v-text-field
            :rules="[requiredRule]"
            v-model="plan.descricao"
            label="Descrição"
          ></v-text-field>
        </v-row>
        <v-row align="center">
          <v-text-field
            class="item"
            :rules="[requiredRule, numberRule]"
            type="number"
            v-model="plan.limite"
            label="Valor"
            prepend-inner-icon="mdi-cash-100"
          />
        </v-row>
        <v-row align="center">
          <chip-periodo
            label="Período"
            v-model:inicial="plan.inicial"
            v-model:final="plan.final"
          ></chip-periodo>
        </v-row>
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
          <v-spacer v-if="planejamento?.id"></v-spacer>
          <v-btn
            v-if="planejamento?.id"
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
<style scoped></style>
<script setup>
import { computed, onMounted, ref, toRaw, watch } from 'vue'
import { numberRule, requiredRule } from '@/services/basic-rules'
import CategoriaAutocomplete from '@/shared/categoria-autocomplete.vue'
import { useCategoriaStore } from '@/stores/categoriaStore'
import { endOfYear, startOfYear } from 'date-fns/fp'
import { prepareMoney } from '@/services/formaters'
import ChipPeriodo from '@/shared/chip-periodo.vue'

const categoriaStore = useCategoriaStore()

const props = defineProps(['planejamento'])
const emit = defineEmits(['onSave', 'onCancel', 'onDel'])

const edit = ref(false)
const valid = ref(false)
const plan = ref({})

const descricao = computed(() => {
  return `${props.planejamento.descricao} (${categoria.value.descricao}) | ${prepareMoney(
    props.planejamento.limite
  )}`
})

const categoria = computed(
  () => categoriaStore.store.categorias?.find((c) => c.id == props.planejamento?.categoria_id) || {}
)

watch(
  () => props.planejamento,
  () => {
    plan.value = reset()
  }
)

onMounted(() => {
  plan.value = reset()
})

const reset = () =>
  structuredClone(
    toRaw(
      props.planejamento || {
        tipo_movimentacao_id: 2,
        inicial: startOfYear(new Date()),
        final: endOfYear(new Date())
      }
    )
  )

const doSave = async () => {
  if (!valid.value) return
  emit('onSave', plan.value)
  plan.value = reset()
  edit.value = false
}

const doCancel = async () => {
  plan.value = reset()
  edit.value = false
  emit('onCancel')
}

const doDel = async () => {
  emit('onDel', plan.value)
}
</script>
