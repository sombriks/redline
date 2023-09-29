<script setup>
import { ref } from "vue";

const props = defineProps(['modelValue', 'label'])
const emit = defineEmits(['update:modelValue'])

const show = ref(false)
const date = ref(props.modelValue)

const doSave = () => {
  emit('update:modelValue', date)
  show.value = false
}
</script>

<template>
  <div class="the-date">
    <div v-if="!show" class="ma-2">{{props.label}}</div>
    <v-btn v-if="!show" class="ma-2" variant="outlined" @click="show = !show">
      {{ props.modelValue?.toLocaleDateString() || 'Selecionar data' }}
    </v-btn>
    <v-date-picker v-if="show" v-model="date" @click:cancel="show=!show" @click:save="doSave"></v-date-picker>
  </div>
</template>

<style scoped>
.the-date {
  display: flex;
}
</style>
