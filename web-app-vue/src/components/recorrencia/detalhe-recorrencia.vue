<template>

  <v-chip
      v-if="!edit"
      rounded
      variant="outlined"
      color="green-accent-2"
      class="ma-2"
      size="x-large"
      :append-icon="props.recorrencia?.id ? 'mdi-playlist-edit' : 'mdi-playlist-plus'"
      @click="edit = !edit"
  >
    {{ props.recorrencia?.descricao || "Nova recorrência" }}
  </v-chip>
</template>
<script setup>
import {ref} from "vue";

const props = defineProps(['recorrencia'])
const emit = defineEmits(['onSave', 'onCancel', 'onDel'])

const edit = ref(false)
</script>
