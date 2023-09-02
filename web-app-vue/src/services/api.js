// base api calls
import { useUserStore } from '@/stores/userStore'

const req = async ({ method = 'POST', uri, payload }) => {
  const token = useUserStore().store.token
  const url = `${import.meta.env.VITE_API_URL}${uri}`
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
  if (token) headers['Authorization'] = `Bearer ${token}`
  const result = await fetch(url, {
    body: JSON.stringify(payload),
    headers,
    method
  })
  return result.json()
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
  await get({ uri: `/${id}/categoria?q=${q}&limit=${limit}&offset=${offset}` })

export const updateCategoria = async ({ id, categoria }) =>
  await put({ uri: `/${id}/categoria/${categoria.id}`, payload: categoria })

export const insertCategoria = async ({ id, categoria }) =>
  await post({ uri: `/${id}/categoria`, payload: categoria })

export const delCategoria = async ({ id, categoria }) =>
  await del({ uri: `/${id}/categoria/${categoria.id}` })

export const lisTiposMovimentacao = async () => await get({ uri: '/tipo-movimentacao' })

export const listMovimentacoes = async ({ id, q = '', limit = 50, offset = 0 }) =>
  await get({ uri: `/${id}/movimentacao?q=${q}&limit=${limit}&offset=${offset}` })

export const insertMovimentacao = async ({ id, conta_id, movimentacao }) =>
  await post({ uri: `/${id}/movimentacao/${conta_id}`, payload: movimentacao })

export const updateMovimentacao = async ({ id, conta_id, movimentacao }) =>
  await put({ uri: `/${id}/movimentacao/${conta_id}/${movimentacao.id}`, payload: movimentacao })

export const delMovimentacao = async ({ id, conta_id, movimentacao }) =>
  await del({ uri: `/${id}/movimentacao/${conta_id}/${movimentacao.id}` })
