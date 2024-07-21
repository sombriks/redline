<template>
  <v-card :title="`Olá ${uState.userData.nome}`" elevation="24" min-width="320">
    <v-card-text>
      <div class="column">
        <v-btn
          v-if="!wantImport"
          class="item"
          color="green"
          variant="outlined"
          @click="(e) => (wantImport = true)"
        >Importar
        </v-btn>
        <v-form
          v-if="wantImport"
          v-model="validImport"
          class="item column"
          @submit.prevent.stop="importData()"
        >
          <p class="item">Veja o <a href="dados.csv">arquivo de exemplo</a></p>
          <v-file-input
            v-model="csvFile"
            :rules="[requiredRule('Arquivo obrigatório'), lengthRule(1,'Ao menos um arquivo deve ser selecionado')]"
            accept="text/plain, text/csv"
            class="item"
            label="Selecionar CSV"
          />
          <i v-if="csvFile.length" class="item">{{ fileInfo }}</i>
          <div class="item row">
            <v-btn
              :disabled="!validImport"
              class="ma-2"
              color="green"
              icon="mdi-check"
              type="submit"
              variant="outlined"
            ></v-btn>
            <v-spacer></v-spacer>
            <v-btn
              class="ma-2"
              color="orange"
              icon="mdi-close"
              type="button"
              variant="outlined"
              @click="(e) => (wantImport = false)"
            ></v-btn>
          </div>
        </v-form>
        <v-btn
          v-if="!wantExport"
          class="item"
          color="blue"
          variant="outlined"
          @click="wantExport = true"
        >Exportar
        </v-btn>
        <v-form
          v-if="wantExport"
          v-model="validExport"
          class="item column"
          @submit.prevent.stop="exportData()"
        >
          <!-- account -->
          <div class="item row">
            <conta-autocomplete v-model="exporta.conta_id" :rules="[requiredRule('Conta obrigatória')]" />
          </div>
          <div class="item row">
            <chip-periodo
              label="Período"
              v-model:inicial="exporta.data_inicio"
              v-model:final="exporta.data_fim"
            ></chip-periodo>
          </div>
          <div class="item row">
            <v-btn
              :disabled="!validExport"
              class="ma-2"
              color="green"
              icon="mdi-check"
              type="submit"
              variant="outlined"
            ></v-btn>
            <v-spacer></v-spacer>
            <v-btn
              class="ma-2"
              color="orange"
              icon="mdi-close"
              type="button"
              variant="outlined"
              @click="closeExport()"
            ></v-btn>
          </div>
        </v-form>
        <v-btn v-if="csvDownload" class="item" color="blue" variant="outlined" :href="csvDownload"
        >Baixar arquivo
        </v-btn>
        <v-btn class="item" color="white" variant="outlined" @click="linkPerfil()">Editar perfil</v-btn>
        <v-btn class="item" color="orange" variant="outlined" @click="logout()">Desconectar</v-btn>
        <v-btn
          v-if="!wantDelete"
          class="item"
          color="red"
          variant="outlined"
          @click="wantDelete = true"
        >Excluir conta
        </v-btn>
        <v-form
          v-if="wantDelete"
          v-model="validDelete"
          class="item"
          @submit.prevent.stop="deleteAccount"
        >
          <v-text-field
            v-model="pwd"
            :rules="[requiredRule('Senha obrigatória')]"
            label="Confirme sua senha"
            type="password"
          />
          <div class="item row">
            <v-btn
              :disabled="!validDelete"
              class="ma-2"
              color="red"
              icon="mdi-trash-can"
              type="submit"
              variant="outlined"
            ></v-btn>
            <v-spacer></v-spacer>
            <v-btn
              class="ma-2"
              color="orange"
              icon="mdi-close"
              type="button"
              variant="outlined"
              @click="wantDelete = false"
            ></v-btn>
          </div>
        </v-form>
        <br />
        <v-divider />
        <div class="column center">
          <a class="item" href="https://github.com/sombriks/redline" target="_blank">
            Este aplicativo é de código aberto</a
          >
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { lengthRule, requiredRule } from '@/services/basic-rules'
import { prepareByte, readTextFile } from '@/services/formatters'
import { downloadCsv, uploadCsv } from '@/services/api'
import { useContaStore } from '@/stores/contaStore'
import { useCategoriaStore } from '@/stores/categoriaStore'
import { useMovimentacaoStore } from '@/stores/movimentacaoStore'
import ContaAutocomplete from '@/shared/conta-autocomplete.vue'
import { endOfMonth, startOfMonth } from 'date-fns'
import ChipPeriodo from '@/shared/chip-periodo.vue'

const router = useRouter()

const wantImport = ref(false)
const wantExport = ref(false)
const wantDelete = ref(false)

const validImport = ref(false)
const validExport = ref(false)
const validDelete = ref(false)

const csvFile = ref([])
const csvDownload = ref('')
const pwd = ref('')

const exporta = reactive({
  conta_id: null,
  data_inicio: startOfMonth(new Date()),
  data_fim: endOfMonth(new Date())
})

const uState = useUserStore()
const contaStore = useContaStore()
const categoriaState = useCategoriaStore()
const movimentacaoState = useMovimentacaoStore()

const fileInfo = computed(
  () => `${csvFile?.value?.[0]?.name}, ${prepareByte(csvFile?.value?.[0]?.size || 0)}`
)

const importData = async () => {
  try {
    const file = await readTextFile(csvFile.value[0])
    const impo = await uploadCsv({ id: uState.userData.id, file })
    console.log(impo)
    alert(`Importação concluída com ${impo.result.imported} sucessos!`)
    await contaStore.sincronizarContas()
    await categoriaState.sincronizarCategorias()
    await movimentacaoState.sincronizarMovimentacoes()
    csvFile.value = []
    wantImport.value = false
    await router.push('/historico')
  } catch (e) {
    console.log(e)
    alert('Algo deu errado')
  }
}

const exportData = async () => {
  const data = await downloadCsv({ id: uState.userData.id, ...exporta })
  const blob = new Blob([data.csv], { type: 'text/csv' })
  csvDownload.value = URL.createObjectURL(blob)
}

const closeExport = () => {
  wantExport.value = false
  csvDownload.value = ''
}

const linkPerfil = async () => {
  alert('um email com o link de solicitação de alteração de dados foi enviado!')
  // XXX remover depois que tiver o serviço de email configurado
  await router.push('/user-details/1234')
}

const logout = async () => {
  await uState.logout()
  await router.push('/')
}

const deleteAccount = async () => {
  if (!validDelete.value) return
  const user = {
    email: uState.userData.email,
    senha: pwd.value
  }
  await uState.deleteAccount(user)
  await router.push('/')
}

onMounted(() => {
  contaStore.sincronizarContas()
})
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
