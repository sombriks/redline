
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
      { descricao: "SALARIO" }, { descricao: "BONUS" }, { descricao: "EXTRA" },
      { descricao: "OUTROS" }, { descricao: "GANHOS" }, { descricao: "MERCADO" },
      { descricao: "RESTAURANTE" }, { descricao: "DELIVERY" }, { descricao: "ALUGUEL" },
      { descricao: "INTERNET" }, { descricao: "TELEFONE" }, { descricao: "VESTUARIO" },
      { descricao: "TRANSPORTE" }, { descricao: "ASSINATURAS" }, { descricao: "SERVICOS" },
      { descricao: "INVESTIMENTOS" }, { descricao: "IMPREVISTOS" }, { descricao: "ELETRONICOS" },
      { descricao: "LAZER" }, { descricao: "SAUDE" }, { descricao: "RESERVA" }
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
    knex("modelocategoria").del(),
    knex("tipo_conta").del(),
    knex("tipo_recorrencia").del(),
    knex("tipo_movimentacao").del()
  ])
};
