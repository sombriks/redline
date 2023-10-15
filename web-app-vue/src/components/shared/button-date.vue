<script setup>
import {ref, watch} from "vue";
import {parseISO} from "date-fns";

const props = defineProps(['modelValue', 'label'])
const emit = defineEmits(['update:modelValue'])

const show = ref(false)


const prepareDate = (date) => {
  if (!date) return date
  if (date.toLocaleDateString) return date
  else return parseISO(date)
}

const date = ref(prepareDate(props.modelValue))

const doSave = () => {
  emit('update:modelValue', date)
  show.value = false
}

watch(() => props.modelValue, () => {
  date.value = prepareDate(props.modelValue)
})
</script>

<template>
  <div class="the-date">
    <div v-if="!show" class="ma-2">{{ props.label }}</div>
    <v-chip v-if="!show" class="ma-2" rounded variant="outlined" @click="show = !show">
      {{ date && date.toLocaleDateString() || 'Selecionar data' }}
    </v-chip>
    <v-date-picker v-if="show" v-model="date" @click:cancel="show=!show" @click:save="doSave"></v-date-picker>
  </div>
</template>

<style scoped>
.the-date {
  display: flex;
}
</style>
