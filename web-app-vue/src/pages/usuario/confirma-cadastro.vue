<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {minSizeRule, requiredRule} from "@/services/basic-rules";
import {useUserStore} from "@/stores/userStore";
import {confirmaCadastro} from "@/services/api";

const router = useRouter()
const uState = useUserStore()

const props = defineProps(['email'])

const valid = ref(false)
const challenge = ref('')

const enviaChallenge = async () => {
  try {
    const result = await confirmaCadastro({email: props.email, challenge: challenge.value})
    if(result.created) {
      alert('Sucesso! faça login normalmente!')
      await router.push("/auth")
    } else {
      alert('Algo deu errado, tente novamente.')
    }
  } catch (e) {
    console.log(e)
    alert(e?.message || 'Algo deu errado')
  }
}
</script>

<template>
  <v-card title="Informe o código de confirmação recebido via email" subtitle="Confira sua caixa de spam">
    <v-card-text>
      <v-form v-model="valid" @submit.prevent.stop="enviaChallenge">
        <div class="inline">
          <v-text-field
              :rules="[requiredRule('Campo obrigatório'), minSizeRule(6, 'Mínimo de 6 caracteres')]"
              v-model="challenge"
              label="Informe o código"
              required
          ></v-text-field>
          <v-btn
              variant="outlined"
              class="ma-2"
              color="green"
              type="submit"
              icon="mdi-check"
          ></v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.inline {
  display: flex;
}
</style>
