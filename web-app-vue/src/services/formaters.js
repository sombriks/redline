import { parseISO } from 'date-fns'

export const prepareDate = (date) => {
  if (!date) return date
  if (date.toLocaleDateString) return date
  if (!isNaN(date)) return new Date(date)
  return parseISO(date)
}

export const prepareMoney = (money) => {
  if (!money) return 'R$ 0,00'
  if (isNaN(money)) throw Error('Invalid number received')
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(money)
}

export const prepareByte = (n) => {
  if (isNaN(n)) throw Error('Invalid number received')
  return new Intl.NumberFormat('pt-BR', {
    style: 'unit',
    unit: 'byte'
  }).format(n)
}

export const readTextFile = (file) => {
  return new Promise((resolve, reject) => {
    const fr = new FileReader()
    fr.onload = () => resolve(fr.result)
    fr.onerror = reject
    fr.readAsText(file.blob ? file.blob : file)
  })
}

export const prepareBalance = (movimentacoes) => {
  if (!movimentacoes.value.length) return 0
  return movimentacoes.value?.reduce(
    (p, c) => {
      return { valor: isPositiveOrNegative(p) + isPositiveOrNegative(c), tipo_movimentacao_id: 1 }
    },
    { valor: 0 }
  ).valor
}

const isPositiveOrNegative = (m) => {
  const v = parseFloat(m.valor)
  if (m.tipo_movimentacao_id == 1) return v
  return -v
}
