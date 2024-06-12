import { parseISO } from 'date-fns'

export const prepareDate = (date) => {
  // console.log(`date: ${JSON.stringify(date)}`)
  if (!date) return date
  if (date.value) date = date.value
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

export const prepareBalance = (movimentacoes, field = 'valor') => {
  if (!movimentacoes.length) return 0
  return movimentacoes
    .filter((m) => !m.interna)
    .reduce(
      (p, c) => {
        return {
          [field]: isPositiveOrNegative(p, field) + isPositiveOrNegative(c, field),
          tipo_movimentacao_id: 1
        }
      },
      { [field]: 0 }
    )[field]
}

export const prepareIncome = (movimentacoes, field = 'valor') => {
  if (!movimentacoes.length) return 0
  return movimentacoes
    .filter((m) => !m.interna && m.tipo_movimentacao_id === 1)
    .reduce(
      (p, c) => {
        return { [field]: p[field] + parseFloat(c[field]) }
      },
      { [field]: 0 }
    )[field]
}

export const prepareExpense = (movimentacoes, field = 'valor') => {
  if (!movimentacoes.length) return 0
  return movimentacoes
    .filter((m) => !m.interna && m.tipo_movimentacao_id === 2)
    .reduce(
      (p, c) => {
        return { [field]: p[field] + parseFloat(c[field]) }
      },
      { [field]: 0 }
    )[field]
}

const isPositiveOrNegative = (m, field = 'valor') => {
  const v = parseFloat(m[field])
  if (m.tipo_movimentacao_id === 1) return v
  return -v
}
