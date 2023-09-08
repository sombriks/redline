
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  return Promise.all([
    knex("tipo_movimentacao").insert([
      { id: 1, descricao: "ENTRADA" },
      { id: 2, descricao: "SAIDA" }
    ]),
    knex("tipo_recorrencia").insert([
      { id: 1, descricao: "MENSAL" },
      { id: 2, descricao: "ANUAL" },
      { id: 3, descricao: "DIARIA" }
    ]),
    knex("tipo_conta").insert([
      { id: 1, descricao: "CARTEIRA" },
      { id: 2, descricao: "BANCO" },
      { id: 3, descricao: "CARTAO" }
    ]),
    knex("modelocategoria").insert([
      { descricao: "SALARIO", cor: "#00FF16" }, { descricao: "BONUS", cor:"#00A02A" },
      { descricao: "EXTRA", cor:"#00FF49" }, { descricao: "OUTROS", cor:"#87AD86" },
      { descricao: "GANHOS", cor:"#00FF89" }, { descricao: "MERCADO", cor:"#FFCF3F" },
      { descricao: "RESTAURANTE", cor: "#F9C0C0" }, { descricao: "DELIVERY", cor:"#ECFF6E" },
      { descricao: "ALUGUEL", cor: "#E3866A" }, { descricao: "INTERNET", cor:"#35FFFA" },
      { descricao: "TELEFONE", cor: "#FCFF9B" }, { descricao: "VESTUARIO", cor: "#D79A5D" },
      { descricao: "TRANSPORTE", cor: "#613CF9" }, { descricao: "ASSINATURAS", cor:"#639AFF" },
      { descricao: "SERVICOS", cor: "#8482FF" }, { descricao: "INVESTIMENTOS", cor: "#43FFD1" },
      { descricao: "IMPREVISTOS", cor:"#CD9453" }, { descricao: "ELETRONICOS", cor: "#7EBDFF" },
      { descricao: "LAZER", cor: "#FF7D7D" }, { descricao: "SAUDE", cor:"#CE79FF" },
      { descricao: "RESERVA", cor: "#CDFF5B" }
    ]),
    knex("usuario").insert({
      nome:"adm",
      admin: true,
      email: "adm@meudinheiro.cc",
      senha: "6b6e6f776e20696e697469616c697a61@09ef83851dbb53c8eb7d47634bcb08ec"
    })
  ])
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  return Promise.all([
    knex("usuario").del(),
    knex("modelocategoria").del(),
    knex("tipo_conta").del(),
    knex("tipo_recorrencia").del(),
    knex("tipo_movimentacao").del()
  ])
};
