<template>
  <div class="the-date">
    <div class="ma-2">{{ props.label || 'Período' }}</div>
    <v-chip v-if="!edit" class="ma-2" rounded variant="outlined" @click="edit = !edit">
      {{ ini?.toLocaleDateString() || '' }} -
      {{ fin?.toLocaleDateString() || '' }}
    </v-chip>
    <div v-if="edit" class="the-date center">
      <chip-date v-if="edit" v-model="inicial" @update:model-value="edit = false"></chip-date>
      <v-btn
        v-if="edit"
        icon="mdi-history"
        title="Restaurar para mês atual"
        variant="outlined"
        @click="restauraPeriodo"
      ></v-btn>
      <chip-date v-if="edit" v-model="final" @update:model-value="edit = false"></chip-date>
    </div>
  </div>
</template>
<style scoped>
.the-date {
  display: flex;
  flex-wrap: wrap;
}
.center {
  align-items: center;
  justify-content: center;
}
</style>
<script setup>
import { computed, defineModel, ref } from 'vue'
import { prepareDate } from '@/services/formaters'
import ChipDate from '@/shared/chip-date.vue'
import { endOfMonth, startOfMonth } from 'date-fns'
import { endOfYear, startOfYear } from 'date-fns/fp'

const props = defineProps(['label', 'reset'])
const emit = defineEmits(['update:inicial', 'update:final'])

const inicial = defineModel('inicial')
const final = defineModel('final')

const edit = ref(false)

const ini = computed(() => prepareDate(inicial))
const fin = computed(() => prepareDate(final))

const restauraPeriodo = () => {
  if (!props.reset || props.reset === 'mensal') {
    emit('update:inicial', startOfMonth(new Date()))
    emit('update:final', endOfMonth(new Date()))
  } else if (props.reset === 'anual') {
    emit('update:inicial', startOfYear(new Date()))
    emit('update:final', endOfYear(new Date()))
  }
}
</script>
