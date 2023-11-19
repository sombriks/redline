<script setup>
import { ref, watch } from 'vue'
import { parseISO } from 'date-fns'

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

watch(
  () => props.modelValue,
  () => {
    date.value = prepareDate(props.modelValue)
  }
)
</script>

<template>
  <div class="the-date">
    <div v-if="!show" class="ma-2">{{ props.label }}</div>
    <v-chip v-if="!show" class="ma-2" rounded variant="outlined" @click="show = !show">
      {{ (date && date.toLocaleDateString()) || 'Selecionar data' }}
    </v-chip>
    <v-dialog v-model="show" transition="dialog-bottom-transition" scrollable>
      <v-container>
        <v-row justify="space-around">
          <form @submit.prevent.stop="doSave">
            <v-date-picker v-model="date">
              <template #actions>
                <v-row align="center">
                  <v-spacer></v-spacer>
                  <v-btn
                    variant="outlined"
                    color="orange"
                    class="ma-2"
                    type="button"
                    @click="show = !show"
                    icon="mdi-close"
                  ></v-btn>
                  <v-btn variant="outlined" class="ma-2" color="green" type="submit" icon="mdi-check"></v-btn>
                </v-row>
              </template>
            </v-date-picker>
          </form>
        </v-row>
      </v-container>
    </v-dialog>
  </div>
</template>

<style scoped>
.the-date {
  display: flex;
}
</style>
