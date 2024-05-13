import { knex } from '../config/db/index.mjs'

/**
 *
 * @param usuario_id
 * @param inicio
 * @param fim
 */
export const getDashboard = async ({ usuario_id, inicio, fim }) => {
  return {
    receitaDespesaTotalPeriodo: await receitaDespesaTotalPeriodo({ usuario_id, inicio, fim }),
    receitaDespesaEfetivadaPeriodo: await receitaDespesaEfetivadaPeriodo({ usuario_id, inicio, fim }),
    despesaConta: await despesaConta({ usuario_id, inicio, fim }),
    despesaCategoria: await despesaCategoria({ usuario_id, inicio, fim }),
    receitaConta: await receitaConta({ usuario_id, inicio, fim }),
    receitaCategoria: await receitaCategoria({ usuario_id, inicio, fim }),
    composicaoDespesas: [
      {
        label: 'Banco',
        color: 'red',
        data: [
          { label: 'Moradia', value: 4000, color: 'gray' },
          { label: 'Internet', value: 600, color: 'green' }
        ]
      },
      {
        label: 'Cartão',
        color: 'cyan',
        data: [{ label: 'Empréstimos', value: 3000, color: 'brown' }]
      },
      {
        label: 'Carteira',
        color: 'violet',
        data: [
          { label: 'Transporte', value: 1500, color: 'blue' },
          { label: 'Alimentação', value: 5000, color: 'red' },
          { label: 'Outros', value: 700, color: 'blue' }
        ]
      }
    ],
    composicaoReceitas: [
      {
        label: 'Conta 1',
        color: 'lightblue',
        data: [{ label: 'Salário', value: 18000, color: 'lightgreen' }]
      }
    ],
    saldos: {
      // Saldos relativos ao período
      anteriorGeral: 0,
      anterior1Ano: -10,
      anterior6Meses: 0,
      anterior1Mes: 0,
      periodo: 0,
      projetado1Mes: 0,
      projetado6Meses: 10,
      projetado1Ano: 0
    },
    vencimentos: {
      quitadas: 7,
      aVencer: 3,
      emAtraso: 0
    },
    limites: [],
    planejamentos: []
  }
}

async function receitaDespesaTotalPeriodo({ usuario_id, inicio, fim }) {
  return knex.raw(`
      with data_frame as (select *
                          from movimentacao
                          where conta_id in (select id from conta where usuario_id = :usuario_id)
                            and vencimento between :inicio and :fim)
      select 'Receita total' as label, sum(valor) as value, 'lightgreen' as color
      from data_frame
      where tipo_movimentacao_id = 1
      union
      select 'Despesa total' as label, sum(valor) as value, 'red' as color
      from data_frame
      where tipo_movimentacao_id = 2
  `, { usuario_id, inicio: new Date(inicio).toISOString(), fim: new Date(fim).toISOString() })
}

async function receitaDespesaEfetivadaPeriodo({ usuario_id, inicio, fim }) {
  return knex.raw(`
      with data_frame as (select *
                          from movimentacao
                          where conta_id in (select id from conta where usuario_id = :usuario_id)
                            and vencimento between :inicio and :fim
                            and efetivada is not null)
      select 'Receita efetivada' as label, sum(valor) as value, 'lightgreen' as color
      from data_frame
      where tipo_movimentacao_id = 1
      union
      select 'Despesa efetivada' as label, sum(valor) as value, 'red' as color
      from data_frame
      where tipo_movimentacao_id = 2
  `, { usuario_id, inicio: new Date(inicio).toISOString(), fim: new Date(fim).toISOString() })

}

async function despesaConta({ usuario_id, inicio, fim }) {
  return knex.raw(`
      with data_frame as (select *
                          from conta
                                   join movimentacao on conta.id = movimentacao.conta_id
                          where usuario_id = :usuario_id
                            and tipo_movimentacao_id = 2
                            and vencimento between :inicio and :fim)
      select descricao  as label,
             cor,
             sum(valor) as value
      from data_frame
      group by descricao, cor
  `, { usuario_id, inicio: new Date(inicio).toISOString(), fim: new Date(fim).toISOString() })
}

async function despesaCategoria({ usuario_id, inicio, fim }) {
  return knex.raw(`
      with data_frame as (select categoria.*, movimentacao.*
                          from movimentacao
                                   left join categoria on categoria.id = movimentacao.categoria_id
                          where usuario_id = :usuario_id
                            and tipo_movimentacao_id = 2
                            and vencimento between :inicio and :fim)
      select descricao  as label,
             cor,
             sum(valor) as value
      from data_frame
      group by descricao, cor
  `, { usuario_id, inicio: new Date(inicio).toISOString(), fim: new Date(fim).toISOString() })
}


async function receitaConta({ usuario_id, inicio, fim }) {
  return knex.raw(`
      with data_frame as (select *
                          from conta
                                   join movimentacao on conta.id = movimentacao.conta_id
                          where usuario_id = :usuario_id
                            and tipo_movimentacao_id = 1
                            and vencimento between :inicio and :fim)
      select descricao  as label,
             cor,
             sum(valor) as value
      from data_frame
      group by descricao, cor
  `, { usuario_id, inicio: new Date(inicio).toISOString(), fim: new Date(fim).toISOString() })
}

async function receitaCategoria({ usuario_id, inicio, fim }) {
  return knex.raw(`
      with data_frame as (select categoria.*, movimentacao.*
                          from movimentacao
                                   left join categoria on categoria.id = movimentacao.categoria_id
                          where usuario_id = :usuario_id
                            and tipo_movimentacao_id = 1
                            and vencimento between :inicio and :fim)
      select descricao  as label,
             cor,
             sum(valor) as value
      from data_frame
      group by descricao, cor
  `, { usuario_id, inicio: new Date(inicio).toISOString(), fim: new Date(fim).toISOString() })
}
