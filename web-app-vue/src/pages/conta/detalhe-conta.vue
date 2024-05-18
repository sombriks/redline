<template>
  <chip-conta
    v-if="!edit"
    class="ma-2"
    size="x-large"
    :conta="props.conta"
    :color="props.conta?.cor || 'green-accent-2'"
    :append-icon="props.conta.id ? 'mdi-playlist-edit' : 'mdi-playlist-plus'"
    @click="edit = !edit"
  ></chip-conta>
  <v-card v-if="edit" elevation="24" min-width="300px" class="ma-2">
    <v-form v-model="valid" @submit.prevent.stop="doUpdate">
      <v-color-picker v-model="contaEdit.cor"></v-color-picker>
      <v-select
        v-model="contaEdit.tipo_conta_id"
        :items="cState.store.tiposConta"
        item-title="descricao"
        item-value="id"
        :prepend-inner-icon="contaIcon"
      >
      </v-select>
      <v-text-field
        :rules="[requiredRule]"
        v-model="contaEdit.descricao"
        label="Descrição"
      ></v-text-field>
      <v-text-field
        v-if="contaEdit.tipo_conta_id == 3"
        :rules="[dayOfMonthRule]"
        v-model="contaEdit.dia_fechamento"
        label="Fechamento"
        prepend-inner-icon="mdi-calendar-check"
      ></v-text-field>
      <v-text-field
        v-if="contaEdit.tipo_conta_id == 3"
        :rules="[dayOfMonthRule]"
        v-model="contaEdit.dia_vencimento"
        label="Vencimento"
        prepend-inner-icon="mdi-calendar-alert"
      ></v-text-field>
      <v-text-field
        v-if="contaEdit.tipo_conta_id == 3 || contaEdit.tipo_conta_id == 2"
        :rules="[numberRule]"
        type="number"
        v-model="contaEdit.limite"
        :label="contaEdit.tipo_conta_id == 2 ? 'Cheque especial' : 'Limite' "
        prepend-inner-icon="mdi-cash-100"
      ></v-text-field>
      <v-container>
        <v-row align="center">
          <v-btn class="ma-2" color="green" type="submit" icon="mdi-check"></v-btn>
          <v-spacer v-if="!contaEdit.id"></v-spacer>
          <v-btn
            variant="outlined"
            color="orange"
            class="ma-2"
            type="button"
            @click="edit = !edit"
            icon="mdi-close"
          ></v-btn>
          <v-spacer v-if="contaEdit.id"></v-spacer>
          <v-btn
            v-if="contaEdit.id"
            variant="outlined"
            color="red"
            class="ma-2"
            type="button"
            @click="emit('onRemove', contaEdit)"
            icon="mdi-trash-can-outline"
          ></v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>
<script setup>
import { computed, reactive, ref } from 'vue'
import { useContaStore } from '@/stores/contaStore'
import { dayOfMonthRule, numberRule, requiredRule } from '@/services/basic-rules'
import ChipConta from '@/pages/shared/chip-conta.vue'

const cState = useContaStore()

const props = defineProps(['conta'])

const emit = defineEmits(['onRemove', 'onSave'])

const edit = ref(false)

const valid = ref(false)

const contaEdit = reactive({ ...props.conta })

const contaIcon = computed(() => {
  if (contaEdit.tipo_conta_id == '2') return 'mdi-bank'
  if (contaEdit.tipo_conta_id == '3') return 'mdi-credit-card'
  return 'mdi-wallet'
})

const doUpdate = async () => {
  if (!valid.value) return
  emit('onSave', contaEdit)
  edit.value = !edit.value
}
</script>
