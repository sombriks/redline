<template>
  <v-card elevation="24" :title="`Olá ${uState.userData.nome}`" min-width="320">
    <v-card-text>
      <div class="column">
        <v-btn
          v-if="!wantImport"
          class="item"
          variant="outlined"
          color="green"
          @click="wantImport = true"
          >Importar
        </v-btn>
        <v-form
          v-model="validImport"
          v-if="wantImport"
          class="item column"
          @submit.prevent.stop="importData()"
        >
          <p class="item">Veja o <a href="dados.csv">arquivo de exemplo</a></p>
          <v-file-input
            class="item"
            v-model="csvFile"
            label="Selecionar CSV"
            accept="text/plain, text/csv"
            :rules="[requiredRule, lengthRule(1)]"
          />
          <i class="item" v-if="csvFile.length">{{ fileInfo }}</i>
          <div class="item row">
            <v-btn
              :disabled="!validImport"
              variant="outlined"
              class="ma-2"
              color="green"
              type="submit"
              icon="mdi-check"
            ></v-btn>
            <v-spacer></v-spacer>
            <v-btn
              variant="outlined"
              color="orange"
              class="ma-2"
              type="button"
              @click="wantImport = false"
              icon="mdi-close"
            ></v-btn>
          </div>
        </v-form>
        <v-btn variant="outlined" color="blue" class="item" @click="exportData()">Exportar</v-btn>
        <v-btn variant="outlined" color="orange" class="item" @click="logout()">Desconectar</v-btn>
        <v-btn
          variant="outlined"
          color="red"
          class="item"
          @click="wantDelete = true"
          v-if="!wantDelete"
          >Excluir conta
        </v-btn>
        <v-form
          v-model="validDelete"
          class="item"
          v-if="wantDelete"
          @submit.prevent.stop="deleteAccount"
        >
          <v-text-field
            label="Confirme sua senha"
            :rules="[requiredRule]"
            type="password"
            v-model="pwd"
          />
          <div class="item row">
            <v-btn
              :disabled="!validDelete"
              variant="outlined"
              class="ma-2"
              color="red"
              type="submit"
              icon="mdi-trash-can"
            ></v-btn>
            <v-spacer></v-spacer>
            <v-btn
              variant="outlined"
              color="orange"
              class="ma-2"
              type="button"
              @click="wantDelete = false"
              icon="mdi-close"
            ></v-btn>
          </div>
        </v-form>
        <br/>
        <v-divider/>
        <div class="column center">
          <a class="item" target="_blank" href="https://github.com/sombriks/redline"
            >This is an open source project</a>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { router } from '@/services/router'
import { requiredRule, lengthRule } from '@/services/basic-rules'
import { prepareByte, readTextFile } from '@/services/formaters'
import { uploadCsv } from '@/services/api'

const wantImport = ref(false)
const wantDelete = ref(false)
const validImport = ref(false)
const validDelete = ref(false)

const csvFile = ref([])
const pwd = ref('')

const uState = useUserStore()

const fileInfo = computed(
  () => `${csvFile?.value?.[0]?.name}, ${prepareByte(csvFile?.value?.[0]?.size || 0)}`
)
const importData = async () => {
  const file = await readTextFile(csvFile.value[0])
  await uploadCsv({ id: uState.userData.id, file })
}

const exportData = async () => {}

const logout = async () => {
  await uState.logout()
  await router.push('/')
}

const deleteAccount = async () => {
  if (!validDelete.value) return
  const user = {
    email: uStore.userData.email,
    senha: pwd.value
  }
  await uStore.deleteAccount(user)
  await router.push('/')
}
</script>
<style scoped>
.column {
  display: flex;
  flex-direction: column;
}

.item {
  margin: 5px;
}

.row {
  display: flex;
  flex-direction: row;
}

.center {
  align-items: center;
}
</style>
