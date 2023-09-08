<template>
  <!--  <li>-->
  <!--    <span v-if="!edit"> {{ props.conta.tipo.descricao }} - {{ props.conta.descricao }} </span>-->
  <!--    <form @submit.prevent.stop="doUpdate" v-if="edit">-->
  <!--      <select v-model="contaEdit.tipo" required>-->
  <!--        <option v-for="t in contaStore.store.tiposConta" :key="t.id" :value="t">-->
  <!--          {{ t.descricao }}-->
  <!--        </option>-->
  <!--      </select>-->
  <!--      <input v-model="contaEdit.descricao" />-->
  <!--      <button type="submit">&#9989;</button>-->
  <!--    </form>-->
  <!--    <button v-if="!edit" @click="edit = !edit">✏️</button>-->
  <!--    <button v-if="edit" @click="edit = !edit">&#10060;</button>-->
  <!--    <button v-if="!edit" @click="emit('onRemove', props.conta)">&#128686;</button>-->
  <!--  </li>-->
  <v-chip
    v-if="!edit"
    rounded
    variant="outlined"
    :color="props.conta?.cor || 'green-accent-2'"
    class="ma-2"
    size="x-large"
    :prepend-icon="contaIcon"
    :append-icon="props.conta.id ? 'mdi-playlist-edit' : 'mdi-playlist-plus'"
    @click="edit = !edit"
    >{{ props.conta.descricao }}
  </v-chip>
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
        v-if="contaEdit.tipo_conta_id == 3"
        :rules="[numberRule]"
        type="number"
        v-model="contaEdit.limite"
        label="Limite"
        prepend-inner-icon="mdi-cash-100"
      ></v-text-field>
      <v-container>
        <v-row align="center">
          <v-btn class="ma-2" color="green" type="submit" icon="mdi-check"></v-btn>
          <v-btn
            variant="tonal"
            color="orange"
            class="ma-2"
            type="button"
            @click="edit = !edit"
            icon="mdi-close"
          ></v-btn>
          <v-spacer></v-spacer>
          <v-btn
            v-if="contaEdit.id"
            variant="tonal"
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
import { dayOfMonthRule, numberRule, requiredRule } from "@/form-rules/basic-rules";

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
  if(!valid.value) return
  emit('onSave', contaEdit)
  edit.value = !edit.value
}
</script>
