// unifying how we init, update and store local state
export const getRedLine = () => {
  let redLine = {
    token: null,
    tiposConta: [],
    contas: [],
    categorias: [],
    movimentacoes: [],
    tiposMovimentacao: []
  }
  const lastState = localStorage.getItem('redLine')
  if (lastState) {
    redLine = JSON.parse(lastState)
  }
  return redLine
}

export const setRedLine = (redLine) => {
  // XXX validations
  localStorage.setItem('redLine', JSON.stringify(redLine))
}

export const clearRedLine = () => {
  localStorage.removeItem('redLine')
  return getRedLine()
}
