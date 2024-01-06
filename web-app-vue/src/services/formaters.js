import { parseISO } from 'date-fns'

export const prepareDate = (date) => {
  if (!date) return date
  if (date.toLocaleDateString) return date
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
