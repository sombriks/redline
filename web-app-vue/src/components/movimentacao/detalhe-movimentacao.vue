<template>
  <li v-if="!edit">
    {{ props.movimentacao.tipo?.descricao }} - {{ props.movimentacao.descricao }} -
    {{ props.movimentacao.valor }} -
    <button v-if="!edit" @click="edit = !edit">✏️</button>
    <button @click="emit('onRemove', props.movimentacao)">&#128686;</button>
  </li>
  <li v-else>
    <form @submit.prevent.stop="save">

    </form>
  </li>
</template>
<script setup>
import { ref } from "vue";

const props = defineProps(['movimentacao'])

const emit = defineEmits(['onRemove', 'onUpdate'])

const edit = ref(false)

const save = () => {
  console.log(props)
}
</script>
