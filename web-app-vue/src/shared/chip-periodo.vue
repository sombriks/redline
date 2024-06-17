<template>
  <div class="the-date">
    <div class="ma-2">{{ props.label }}</div>
    <v-chip v-if="!edit" class="ma-2" rounded variant="outlined" @click="edit = !edit">
      {{ ini?.toLocaleDateString() || '' }} -
      {{ fin?.toLocaleDateString() || '' }}
    </v-chip>
    <div v-if="edit" class="the-date center">
      <chip-date v-if="edit" v-model="inicial" @close="edit = false"></chip-date>
      <v-menu v-if="edit" transition="slide-y-transition" :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <v-btn
            icon="mdi-history"
            title="Restaurar para mês atual"
            variant="outlined"
            v-bind="props"
          ></v-btn>
        </template>
        <v-sheet border rounded>
          <v-btn
            border="0"
            variant="outlined"
            icon="mdi-chevron-double-left"
            @click="voltaAno"
          ></v-btn>
          <v-btn border="0" variant="outlined" icon="mdi-chevron-left" @click="voltaMes"></v-btn>
          <v-btn
            border="0"
            variant="outlined"
            :icon="link ? 'mdi-link' : 'mdi-link-off'"
            @click="link = !link"
          ></v-btn>
          <v-btn border="0" variant="outlined" icon="mdi-chevron-right" @click="vaiMes"></v-btn>
          <v-btn
            border="0"
            variant="outlined"
            icon="mdi-chevron-double-right"
            @click="vaiAno"
          ></v-btn>
        </v-sheet>
      </v-menu>
      <chip-date v-if="edit" v-model="final" @close="edit = false"></chip-date>
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
import { addMonths, addYears } from 'date-fns'

const props = defineProps(['label', 'reset'])
// const emit = defineEmits(['update:inicial', 'update:final'])

const inicial = defineModel('inicial')
const final = defineModel('final')

const edit = ref(false)

const link = ref(true)

const ini = computed(() => prepareDate(inicial))
const fin = computed(() => prepareDate(final))

const voltaAno = () => {
  inicial.value = addYears(ini.value, -1)
  if (link.value) final.value = addYears(fin.value, -1)
}
const voltaMes = () => {
  inicial.value = addMonths(ini.value, -1)
  if (link.value) final.value = addMonths(fin.value, -1)
}
const vaiMes = () => {
  final.value = addMonths(fin.value, 1)
  if (link.value) inicial.value = addMonths(ini.value, 1)
}
const vaiAno = () => {
  final.value = addYears(fin.value, 1)
  if (link.value) inicial.value = addYears(ini.value, 1)
}
</script>
