<template>
  <div class="the-date">
    <div v-if="!show && props.label" class="ma-2">{{ props.label }}</div>
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
                    @click="close()"
                    icon="mdi-close"
                  ></v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                      variant="outlined"
                      color="red"
                      class="ma-2"
                      type="button"
                      @click="clear()"
                      icon="mdi-trash-can-outline"
                  ></v-btn>
                </v-row>
              </template>
            </v-date-picker>
          </form>
        </v-row>
      </v-container>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { prepareDate } from '@/services/formatters'

const props = defineProps(['modelValue', 'label'])
const emit = defineEmits(['update:modelValue', 'close'])

const show = ref(false)

const date = ref(prepareDate(props.modelValue))

const doSave = () => {
  emit('update:modelValue', date.value)
  close()
}

const close = () => {
  show.value = false
  emit("close")
}

const clear = () => {
  emit('update:modelValue', null)
  close()
}

watch(props, () => {
  date.value = prepareDate(props.modelValue)
})
</script>

<style scoped>
.the-date {
  display: flex;
}
</style>
