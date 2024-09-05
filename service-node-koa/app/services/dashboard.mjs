import { knex } from "../config/db/index.mjs";
import { addMonths, addYears } from "date-fns";

export const getDashboard = async ({ usuario_id, inicio, fim }) => {
	inicio = new Date(inicio).toISOString();
	fim = new Date(fim).toISOString();
	const result = {
		receitaDespesaTotalPeriodo: unwrap(
			await receitaDespesaTotalPeriodo({ usuario_id, inicio, fim }),
		),
		receitaDespesaEfetivadaPeriodo: unwrap(
			await receitaDespesaEfetivadaPeriodo({ usuario_id, inicio, fim }),
		),
		despesaConta: unwrap(await despesaConta({ usuario_id, inicio, fim })),
		despesaCategoria: unwrap(
			await despesaCategoria({ usuario_id, inicio, fim }),
		),
		receitaConta: unwrap(await receitaConta({ usuario_id, inicio, fim })),
		receitaCategoria: unwrap(
			await receitaCategoria({ usuario_id, inicio, fim }),
		),
		composicaoDespesas: unwrap(
			await composicaoDespesas({ usuario_id, inicio, fim }),
		),
		composicaoReceitas: unwrap(
			await composicaoReceitas({ usuario_id, inicio, fim }),
		),
		saldos: await saldos({ usuario_id, inicio, fim }),
		vencimentos: unwrap(await vencimentos({ usuario_id, inicio, fim })),
		limites: unwrap(await limites({ usuario_id, inicio, fim })),
		planejamentos: unwrap(await planejamentos({ usuario_id, inicio, fim })),
	};
	return result;
};

async function receitaDespesaTotalPeriodo({ usuario_id, inicio, fim }) {
	return knex.raw(
		`
      with data_frame as (select *
                          from movimentacao
                          where conta_id in (select id from conta where usuario_id = :usuario_id)
                            and vencimento between :inicio and :fim
                            and interna is not true)
      select 'Receita total' as label, coalesce(sum(valor),0) as value, 'lightgreen' as color
      from data_frame
      where tipo_movimentacao_id = 1
      union
      select 'Despesa total' as label, coalesce(sum(valor),0) as value, 'red' as color
      from data_frame
      where tipo_movimentacao_id = 2
  `,
		{ usuario_id, inicio, fim },
	);
}

async function receitaDespesaEfetivadaPeriodo({ usuario_id, inicio, fim }) {
	return knex.raw(
		`
      with data_frame as (select *
                          from movimentacao
                          where conta_id in (select id from conta where usuario_id = :usuario_id)
                            and vencimento between :inicio and :fim
                            and efetivada is not null
                            and interna is not true)
      select 'Receita efetivada' as label, sum(valor) as value, 'lightgreen' as color
      from data_frame
      where tipo_movimentacao_id = 1
      union
      select 'Despesa efetivada' as label, sum(valor) as value, 'red' as color
      from data_frame
      where tipo_movimentacao_id = 2
  `,
		{ usuario_id, inicio, fim },
	);
}

async function despesaConta({ usuario_id, inicio, fim }) {
	return knex.raw(
		`
      with data_frame as (select conta.descricao, conta.cor, movimentacao.valor
                          from conta
                                   join movimentacao on conta.id = movimentacao.conta_id
                          where usuario_id = :usuario_id
                            and tipo_movimentacao_id = 2
                            and interna is not true
                            and vencimento between :inicio and :fim)
      select descricao  as label,
             cor        as color,
             sum(valor) as value
      from data_frame
      group by descricao, cor
  `,
		{ usuario_id, inicio, fim },
	);
}

async function despesaCategoria({ usuario_id, inicio, fim }) {
	return knex.raw(
		`
      with data_frame as (select categoria.descricao, categoria.cor, movimentacao.valor
                          from movimentacao
                                   left join categoria on categoria.id = movimentacao.categoria_id
                          where usuario_id = :usuario_id
                            and tipo_movimentacao_id = 2
                            and interna is not true
                            and vencimento between :inicio and :fim)
      select descricao  as label,
             cor        as color,
             sum(valor) as value
      from data_frame
      group by descricao, cor
  `,
		{ usuario_id, inicio, fim },
	);
}

async function receitaConta({ usuario_id, inicio, fim }) {
	return knex.raw(
		`
      with data_frame as (select conta.descricao, conta.cor, movimentacao.valor
                          from conta
                                   join movimentacao on conta.id = movimentacao.conta_id
                          where usuario_id = :usuario_id
                            and tipo_movimentacao_id = 1
                            and interna is not true
                            and vencimento between :inicio and :fim)
      select descricao  as label,
             cor        as color,
             sum(valor) as value
      from data_frame
      group by descricao, cor
  `,
		{ usuario_id, inicio, fim },
	);
}

async function receitaCategoria({ usuario_id, inicio, fim }) {
	return knex.raw(
		`
      with data_frame as (select categoria.descricao, categoria.cor, movimentacao.valor
                          from movimentacao
                                   left join categoria on categoria.id = movimentacao.categoria_id
                          where usuario_id = :usuario_id
                            and tipo_movimentacao_id = 1
                            and interna is not true
                            and vencimento between :inicio and :fim)
      select descricao  as label,
             cor        as color,
             sum(valor) as value
      from data_frame
      group by descricao, cor
  `,
		{ usuario_id, inicio, fim },
	);
}

async function composicaoDespesas({ usuario_id, inicio, fim }) {
	const contas = await knex("conta").where({ usuario_id });
	for await (const conta of contas) {
		const conta_id = conta.id;
		conta.color = conta.cor;
		conta.data = unwrap(
			await knex.raw(
				`
        with data_frame as (select categoria.descricao, categoria.cor, movimentacao.valor
                            from movimentacao
                                     left join categoria on categoria.id = movimentacao.categoria_id
                            where conta_id = :conta_id
                              and vencimento between :inicio and :fim
                              and tipo_movimentacao_id = 2)
        select descricao as label, cor as color, sum(valor) as value
        from data_frame
        group by descricao, cor
    `,
				{ conta_id, inicio, fim },
			),
		);
	}
	return contas.filter((c) => c.data.length);
}

async function composicaoReceitas({ usuario_id, inicio, fim }) {
	const contas = await knex("conta").where({ usuario_id });
	for await (const conta of contas) {
		const conta_id = conta.id;
		conta.color = conta.cor;
		conta.data = unwrap(
			await knex.raw(
				`
        with data_frame as (select categoria.descricao, categoria.cor, movimentacao.valor
                            from movimentacao
                                     left join categoria on categoria.id = movimentacao.categoria_id
                            where conta_id = :conta_id
                              and vencimento between :inicio and :fim
                              and tipo_movimentacao_id = 1)
        select descricao as label, cor as color, sum(valor) as value
        from data_frame
        group by descricao, cor
    `,
				{ conta_id, inicio, fim },
			),
		);
	}
	return contas.filter((c) => c.data.length);
}

async function saldos({ usuario_id, inicio, fim }) {
	return {
		anterior1Ano: unwrapSaldos(
			await saldo({
				usuario_id,
				inicio: addYears(inicio, -1).toISOString(),
				fim: inicio,
			}),
		),
		anterior6Meses: unwrapSaldos(
			await saldo({
				usuario_id,
				inicio: addMonths(inicio, -6).toISOString(),
				fim: inicio,
			}),
		),
		anterior1Mes: unwrapSaldos(
			await saldo({
				usuario_id,
				inicio: addMonths(inicio, -1).toISOString(),
				fim: inicio,
			}),
		),
		periodo: unwrapSaldos(await saldo({ usuario_id, inicio, fim })),
		projetado1Mes: unwrapSaldos(
			await saldo({
				usuario_id,
				inicio: addMonths(inicio, 1).toISOString(),
				fim: addMonths(fim, 1).toISOString(),
			}),
		),
		projetado6Meses: unwrapSaldos(
			await saldo({
				usuario_id,
				inicio: addMonths(inicio, 1).toISOString(),
				fim: addMonths(fim, 6).toISOString(),
			}),
		),
		projetado1Ano: unwrapSaldos(
			await saldo({
				usuario_id,
				inicio: addMonths(inicio, 1).toISOString(),
				fim: addYears(fim, 1).toISOString(),
			}),
		),
	};
}

async function saldo({ usuario_id, inicio, fim }) {
	return knex.raw(
		`
      with entradas as (select coalesce(sum(valor),0) as value
                        from movimentacao
                        where tipo_movimentacao_id = 1
                          and conta_id in (select id from conta where usuario_id = :usuario_id)
                          and vencimento between :inicio and :fim),
           saidas as (select coalesce(sum(valor),0) as value
                      from movimentacao
                      where tipo_movimentacao_id = 2
                        and conta_id in (select id from conta where usuario_id = :usuario_id)
                        and vencimento between :inicio and :fim)
      select entradas.value - saidas.value as saldo
      from entradas,
           saidas
  `,
		{ usuario_id, inicio, fim },
	);
}

async function vencimentos({ usuario_id, inicio, fim }) {
	const [result] = unwrap(
		await knex.raw(
			`
      with data_frame as (select vencimento, efetivada
                          from movimentacao
                          where conta_id in (select id from conta where usuario_id = :usuario_id)
                            and vencimento between :inicio and :fim 
                            and interna is not true),
           em_atraso as (select count(*) as contas
                         from data_frame
                         where efetivada is null
                           and vencimento <= CURRENT_TIMESTAMP),
           a_vencer as (select count(*) as contas
                        from data_frame
                        where efetivada is null
                          and vencimento >= CURRENT_TIMESTAMP),
           quitadas as (select count(*) as contas
                        from data_frame
                        where efetivada is not null)
      select em_atraso.contas as em_atraso, a_vencer.contas as a_vencer, quitadas.contas as quitadas
      from em_atraso,
           a_vencer,
           quitadas;
  `,
			{ usuario_id, inicio, fim },
		),
	);
	return result;
}

async function limites({ usuario_id, inicio, fim }) {
	return knex.raw(
		`
      with data_frame as (select m.id, conta_id, valor, tipo_movimentacao_id, t.descricao as type
                          from movimentacao m
                                   join tipo_movimentacao t on m.tipo_movimentacao_id = t.id
                          where m.vencimento between :inicio and :fim
                            and m.conta_id in (select id from conta where usuario_id = :usuario_id))
      select m.id                                   as id,
             c.descricao                            as descricao,
             c.cor                                  as color,
             c.limite                               as redline,
             m.type                                 as type,
             m.valor                                as value,
             sum(m.valor * (case m.tipo_movimentacao_id when 1 then 1 else -1 end))
             over (partition by c.id order by m.id) as acc
      from conta c
               left join data_frame m on c.id = m.conta_id
      where c.tipo_conta_id in (2, 3)
        and c.usuario_id = :usuario_id
  `,
		{ usuario_id, inicio, fim },
	);
}

async function planejamentos({ usuario_id, inicio, fim }) {
	return knex.raw(
		`
      with data_frame as (select m.id, categoria_id, valor, tipo_movimentacao_id, t.descricao as type
                          from movimentacao m
                                   join tipo_movimentacao t on m.tipo_movimentacao_id = t.id
                          where m.vencimento between :inicio and :fim
                            and m.conta_id in (select id from conta where usuario_id = :usuario_id))
      select m.id                                   as id,
             p.descricao                            as descricao,
             c.cor                                  as color,
             p.limite                               as redline,
             m.type                                 as type,
             m.valor                                as value,
             sum(m.valor * (case m.tipo_movimentacao_id when 1 then 1 else -1 end))
             over (partition by c.id order by m.id) as acc
      from planejamento p
               join categoria c on p.categoria_id = c.id
               left join data_frame m on c.id = m.categoria_id
      where c.usuario_id = :usuario_id
  `,
		{ usuario_id, inicio, fim },
	);
}

/**
 * knex.raw behaves differently when on sqlite or postgres
 *
 * @param result
 */
function unwrap(result) {
	// XXX check env or knex cfg instead
	return result.rows ?? result;
}

function unwrapSaldos(result) {
	const [{ saldo }] = unwrap(result);
	return saldo;
}
