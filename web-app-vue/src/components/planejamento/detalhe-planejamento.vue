<template>
  <v-chip
    v-if="!edit"
    rounded
    variant="outlined"
    color="green-accent-2"
    :append-icon="planejamento?.id ? 'mdi-playlist-edit' : 'mdi-playlist-plus'"
    class="ma-2"
    size="x-large"
    @click="edit = true"
  >
    {{planejamento?.id ? descricao : "Novo planejamento"}}
  </v-chip>
  <v-card v-if="edit" elevation="24" min-width="300">
    <v-form v-model="valid" @submit.prevent.stop="doSave">
      <v-container>
        <v-row align="center">
          <v-text-field
              :rules="[requiredRule]"
              v-model="planejamento.descricao"
              label="Descrição"
          ></v-text-field>
        </v-row>
        <v-row align="center">
          <categoria-autocomplete v-model="planejamento.categoria_id" />
        </v-row>
        <v-row align="center">
          <v-text-field
              class="item"
              :rules="[requiredRule, numberRule]"
              type="number"
              v-model="planejamento.limite"
              label="Limite"
              prepend-inner-icon="mdi-cash-100"
          />
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
import {computed, reactive, ref, toRaw, watch} from 'vue'
import {numberRule, requiredRule} from "@/services/basic-rules";
import CategoriaAutocomplete from "@/shared/categoria-autocomplete.vue";

const props = defineProps(['planejamento'])
const emit = defineEmits(["onSave", "onCancel", "onDel"])

const edit = ref(false)
const valid = ref(false)
const planejamento = ref(structuredClone(toRaw(props.planejamento || {})))

const descricao = computed(() => {
  return planejamento.value.descricao
})

watch(() => props.planejamento, () => {
  planejamento.value = structuredClone(toRaw(props.planejamento || {}))
})

const doSave = async () => {
  emit('onSave', planejamento.value)
}

const doCancel = async () => {
  planejamento.value = structuredClone(toRaw(props.planejamento || {}))
  edit.value = false
  emit("onCancel")
}

const doDel = async () => {
  emit('onDel', planejamento.value)
}
</script>
