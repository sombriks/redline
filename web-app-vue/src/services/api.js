import { useUserStore } from '@/stores/userStore'
import { useGeneralStore } from '@/stores/generalStore'

const uriParams = ({ uri, params }) =>
  `${uri}?${Object.keys(params)
    .filter((k) => null !== params[k] && undefined !== params[k])
    .map((k) => `${k}=${params[k]}`)
    .join('&')}`

const req = async ({ method = 'POST', uri, payload }) => {
  const userStore = useUserStore()
  const generalStore = useGeneralStore()
  const url = `${import.meta.env.VITE_API_URL}${uri}`
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
  if (userStore.store.token) headers['Authorization'] = `Bearer ${userStore.store.token}`
  try {
    generalStore.loading = true
    const result = await fetch(url, {
      body: JSON.stringify(payload),
      headers,
      method
    })
    if (result.status < 400) return result.json()
    else {
      throw result
    }
  } catch (e) {
    if (e.status === 401) {
      await userStore.logout()
    }
    throw new Error(`${e.status} - ${await e.text()}`)
  } finally {
    if (generalStore.loading === true) {
      setTimeout(() => {
        generalStore.loading = false
      }, 1000)
    }
  }
}

const get = ({ uri }) => req({ method: 'GET', uri })

const post = ({ uri, payload }) => req({ method: 'POST', uri, payload })

const put = ({ uri, payload }) => req({ method: 'PUT', uri, payload })

const del = ({ uri }) => req({ method: 'DELETE', uri })

export const login = async (user) => await post({ uri: '/login', payload: user })

export const createUser = async (newUser) => await post({ uri: '/signup', payload: newUser })

export const removeAccount = async ({ id, email, senha }) =>
  await del({ uri: `/${id}/removeAccount?email=${email}&senha=${senha}` })

export const listTiposConta = async () => await get({ uri: '/tipo-conta' })

export const listContas = async ({ id, q = '', limit = 50, offset = 0 }) =>
  await get({ uri: `/${id}/conta?q=${q}&limit=${limit}&offset=${offset}` })

export const insertConta = async ({ id, novaConta }) =>
  await post({ uri: `/${id}/conta`, payload: novaConta })

export const updateConta = async ({ id, conta }) =>
  await put({ uri: `/${id}/conta/${conta.id}`, payload: conta })

export const deleteConta = async ({ id, conta }) => await del({ uri: `/${id}/conta/${conta.id}` })

export const listCategorias = async ({ id, q = '', limit = 50, offset = 0 }) =>
  await get({ uri: uriParams({ uri: `/${id}/categoria`, params: { id, q, limit, offset } }) })

export const updateCategoria = async ({ id, categoria }) =>
  await put({ uri: `/${id}/categoria/${categoria.id}`, payload: categoria })

export const insertCategoria = async ({ id, categoria }) =>
  await post({ uri: `/${id}/categoria`, payload: categoria })

export const delCategoria = async ({ id, categoria }) =>
  await del({ uri: `/${id}/categoria/${categoria.id}` })

export const lisTiposMovimentacao = async () => await get({ uri: '/tipo-movimentacao' })

export const listMovimentacoes = async ({
  tipo_movimentacao_id = undefined,
  categoria_id = undefined,
  dataInicio = undefined,
  conta_id = undefined,
  dataFim = undefined,
  efetivada = undefined,
  offset = 0,
  limit = 50,
  id,
  q = ''
}) =>
  await get({
    uri: uriParams({
      uri: `/${id}/movimentacao`,
      params: {
        tipo_movimentacao_id,
        categoria_id,
        dataInicio,
        efetivada,
        conta_id,
        dataFim,
        offset,
        limit,
        q
      }
    })
  })

export const insertMovimentacao = async ({ id, conta_id, movimentacao }) =>
  await post({ uri: `/${id}/movimentacao/${conta_id}`, payload: movimentacao })

export const updateMovimentacao = async ({ id, conta_id, movimentacao }) =>
  await put({ uri: `/${id}/movimentacao/${conta_id}/${movimentacao.id}`, payload: movimentacao })

export const delMovimentacao = async ({ id, conta_id, movimentacao }) =>
  await del({ uri: `/${id}/movimentacao/${conta_id}/${movimentacao.id}` })

export const uploadCsv = async ({ id, file }) =>
  await post({ uri: `/${id}/movimentacao/upload`, payload: { file } })

export const downloadCsv = async ({ id, conta_id, data_inicio, data_fim }) =>
  await get({
    uri: uriParams({
      uri: `/${id}/movimentacao/download`,
      params: {
        conta_id,
        data_inicio,
        data_fim
      }
    })
  })

export const listPlanejamentos = async ({ id, q, limit, offset }) =>
  await get({
    uri: uriParams({
      uri: `/${id}/planejamento`,
      params: {
        limit,
        offset,
        q
      }
    })
  })

export const insertPlanejamento = async ({ id, planejamento }) =>
  await post({ uri: `/${id}/planejamento`, payload: planejamento })

export const updatePlanejamento = async ({ id, planejamento }) =>
  await put({ uri: `/${id}/planejamento/${planejamento.id}`, payload: planejamento })

export const delPlanejamento = async ({ id, planejamento_id }) =>
  await del({ uri: `/${id}/planejamento/${planejamento_id}` })

export const listRecorrencias = async ({ id, q, limit, offset }) =>
  await get({
    uri: uriParams({
      uri: `/${id}/recorrencia`,
      params: {
        limit,
        offset,
        q
      }
    })
  })

export const insertRecorrencia = async ({ id, recorrencia }) =>
  await post({ uri: `/${id}/recorrencia`, payload: recorrencia })

export const findRecorrencia = async ({ id, recorrencia_id }) =>
  await get({ uri: `/${id}/recorrencia/${recorrencia_id}` })

export const updateRecorrencia = async ({ id, recorrencia }) =>
  await put({ uri: `/${id}/recorrencia/${recorrencia.id}`, payload: recorrencia })

export const delRecorrencia = async ({ id, recorrencia_id }) =>
  await del({ uri: `/${id}/recorrencia/${recorrencia_id}` })
