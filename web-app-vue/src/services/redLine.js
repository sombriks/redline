// unifying how we init, update and store local state
export const getRedLine = () => {
  let redLine = {};
  const lastState = localStorage.getItem("redLine");
  if (!lastState) {
    redLine = {
      token: null,
      activeCard: {
        login: false,
        movimentacao: false,
        categorias: false,
        planejamentos: false,
        carteirasContas: false,
        configuracoes: false
      }
    };
  } else {
    redLine = JSON.parse(lastState);
  }
  return redLine;
};

export const setRedLine = redLine => {
  // XXX validations
  localStorage.setItem("redLine", JSON.stringify(redLine));
};

export const clearRedLine = () => {
  localStorage.removeItem("redLine");
  return getRedLine();
};
