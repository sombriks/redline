import { parse, parseISO } from 'date-fns'
import { knex } from '../config/db/index.mjs'
import { logger } from '../config/base-logging.mjs'
import { insertConta } from './conta.mjs'
import { insertCategoria } from './categoria.mjs'

export const findMovimentacao = async id => // TODO check account and user too
  knex('movimentacao').where({ id }).first()

export const listMovimentacaoByUsuario = async (params) => {
  const {
    usuario_id = -1
  } = params

  return prepareMovimentacaoQuery(params)
    .whereIn('conta_id',
      knex('conta').where({ usuario_id }).select('id'))
}

export const listMovimentacaoByConta = async (params) => {
  const {
    conta_id = -1
  } = params

  return prepareMovimentacaoQuery(params, { conta_id })
}

/**
 * apply common filters to movitentação query
 *
 * @param params common parameters to query, such as
 *
 * @param params.q general query for part of description
 *
 * @param whereParams
 * @returns {Knex.QueryBuilder<TRecord, TResult>}
 */
const prepareMovimentacaoQuery = (params, whereParams = {}) => {
  const { // TODO aplicar joi ? https://joi.dev/api/?v=17.9.1#general-usage
    q = '',
    tipo_movimentacao_id,
    categoria_id,
    efetivada,
    dataInicio,
    dataFim,
    interna,
    limit = 50,
    offset = 0,
    sort = 'vencimento',
    direction = 'desc'
  } = params

  let query = knex('movimentacao').whereLike('descricao', `%${q}%`)

  if (tipo_movimentacao_id && tipo_movimentacao_id !== 'null') {
    whereParams.tipo_movimentacao_id = tipo_movimentacao_id
  }

  if (categoria_id && categoria_id !== 'null') {
    whereParams.categoria_id = categoria_id
  }

  if (dataInicio
    && dataInicio !== 'null'
    && dataInicio !== 'undefined'
    && dataFim
    && dataFim !== 'null'
    && dataFim !== 'undefined') {
    query = query.whereBetween('vencimento', [new Date(dataInicio).toISOString(), new Date(dataFim).toISOString()])
  }

  if (efetivada == 'true') query = query.whereNotNull('efetivada')
  else if (efetivada == 'false') query = query.whereNull('efetivada')

  if (interna == 'false') query = query.whereNot('interna', true)

  return query
    .where(whereParams)
    .orderBy(sort, direction)
    .offset(offset)
    .limit(limit)
}

export const novaEntrada = async ({ conta_id, valor, descricao, categoria_id, efetivada }) =>
  knex('movimentacao')
    .insert({
      conta_id,
      valor,
      descricao,
      categoria_id,
      efetivada,
      tipo_movimentacao_id: 1 // entrada
    }, ['id'])


export const novaSaida = async ({ conta_id, valor, descricao, categoria_id, efetivada }) =>
  knex('movimentacao')
    .insert({
      conta_id,
      valor,
      descricao,
      categoria_id,
      efetivada,
      tipo_movimentacao_id: 2 // saída
    }, ['id'])

export const insertMovimentacao = async movimentacao =>
  knex('movimentacao').insert(movimentacao, ['id'])

export const updateMovimentacao = async ({ id = -1, movimentacao }) => {
  movimentacao.id = id
  return knex('movimentacao')
    .update(movimentacao)
    .where({ id })
}

export const removeMovimentacao = async (id = -1) =>
  knex('movimentacao')
    .where({ id })
    .del()

export const transferencia = async ({ origem, destino, categoria, valor, vencimento }) => {
  const saida = {
    descricao: `${origem.descricao} => ${destino.descricao}`,
    valor,
    criacao: new Date().toISOString(),
    alteracao: new Date().toISOString(),
    vencimento: new Date(vencimento).toISOString(),
    efetivada: new Date(vencimento).toISOString(),
    conta_id: origem.id,
    categoria_id: categoria.id,
    tipo_movimentacao_id: 2, // saída
    interna: true
  }
  const entrada = {
    descricao: `${destino.descricao} <= ${origem.descricao}`,
    valor,
    criacao: new Date().toISOString(),
    alteracao: new Date().toISOString(),
    vencimento: new Date(vencimento).toISOString(),
    efetivada: new Date(vencimento).toISOString(),
    conta_id: destino.id,
    categoria_id: categoria.id,
    tipo_movimentacao_id: 1, // entrada
    interna: true
  }

  const [{ idEntrada }] = await insertMovimentacao(entrada)
  const [{ idSaida }] = await insertMovimentacao(saida)

  return { idEntrada, idSaida }
}

export const pagamento = async ({ origem, destino, categoria, valor, vencimento, movimentacoes_id }) => {
  const transferencias = await transferencia({ origem, destino, categoria, valor, vencimento })
  await knex('movimentacao').update({ efetivada: vencimento }).whereIn('id', movimentacoes_id)
  return transferencias
}

export const uploadMovimentacoes = async ({ id, header, lines }) => {
  const headerMap = { tipo: -1, conta: -1, categoria: -1, vencimento: -1, efetivada: -1, valor: -1, 'descrição': -1 }
  header.toLowerCase().replace(/"/g, '').split(/[,;]/).forEach((h, i) => {
    if (h in headerMap) headerMap[h] = i
  })
  if (Object.keys(headerMap).some(k => headerMap[k] === -1))
    throw new Error('Unexpected header. Accepted header is ' + Object.keys(headerMap))
  const accountMap = {}
  const categoryMap = {}
  const importStats = { imported: 0, errors: 0, failedLines: [] }

  for (let line of lines) {
    line = line.replace(/"/g, '').split(/[,;]/) // unquote and split
    try {
      let tipoMovimentacao = 'entrada' === line[headerMap.tipo].toLowerCase() ? 1 : 2
      const conta = await findOrCreateAccount({ id, headerMap, accountMap, line })
      const categoria = await findOrCreateCategory({ id, headerMap, categoryMap, line })
      const vencimento = resolveDate(line[headerMap.vencimento])?.toISOString()
      if (!vencimento)
        throw new Error('Must provide a valid creation date')
      const efetivada = resolveDate(line[headerMap.efetivada])?.toISOString()
      let valor = line[headerMap.valor]
      const descricao = line[headerMap['descrição']]
      if (valor < 0) {
        tipoMovimentacao = 2
        valor *= -1
      }
      await knex('movimentacao').insert({
        tipo_movimentacao_id: tipoMovimentacao,
        categoria_id: categoria?.id,
        conta_id: conta.id,
        vencimento,
        descricao,
        efetivada,
        valor
      })
      importStats.imported++
    } catch (e) {
      importStats.errors++
      importStats.failedLines.push(line)
      logger.warn(e && e.err || e)
    }
  }
  return importStats
}

export const downloadMovimentacoes = async ({ id, conta_id, data_inicio, data_fim }) => {
  const result = await knex('movimentacao')
    .select(
      'tipo_movimentacao.descricao as tipo',
      'conta.descricao as conta',
      'categoria.descricao as categoria',
      'movimentacao.vencimento',
      'movimentacao.efetivada',
      'movimentacao.valor',
      'movimentacao.descricao'
    ).join('tipo_movimentacao', 'movimentacao.tipo_movimentacao_id', 'tipo_movimentacao.id')
    .join('conta', 'movimentacao.conta_id', 'conta.id')
    .leftJoin('categoria', 'movimentacao.categoria_id', 'categoria.id')
    .whereIn('conta_id', knex('conta').select('id').where('usuario_id', id))
    .andWhere({ conta_id })
    .andWhereBetween('vencimento', [new Date(data_inicio).toISOString(), new Date(data_fim).toISOString()])
  let csv = 'tipo,conta,categoria,vencimento,efetivada,valor,descrição\n'
  result.forEach(r => csv += `${r.tipo},${r.conta},${r.categoria},${r.vencimento},${r.efetivada},${r.valor},${r.descricao}\n`)
  return csv
}

const findOrCreateAccount = async ({ id, headerMap, accountMap, line }) => {
  let conta = accountMap[line[headerMap.conta]]
  if (conta) return conta
  conta = await knex('conta')
    .where('usuario_id', id)
    .whereLike('descricao', `%${line[headerMap.conta]}%`) // TODO upper / lower case
    .first()
  if (!conta) {
    conta = {
      descricao: line[headerMap.conta],
      tipo_conta_id: 2,
      usuario_id: id
    }
    const [{ id: conta_id }] = await insertConta(conta)
    conta.id = conta_id
  }
  accountMap[line[headerMap.conta]] = conta
  return conta
}

const findOrCreateCategory = async ({ id, headerMap, categoryMap, line }) => {
  if (line[headerMap.categoria] == '') return null
  let category = categoryMap[line[headerMap.categoria]]
  if (category) return category
  category = await knex('categoria')
    .where('usuario_id', id)
    .whereLike('descricao', `%${line[headerMap.categoria]}%`) // TODO upper / lower case
    .first()
  if (!category) {
    category = {
      descricao: line[headerMap.categoria],
      usuario_id: id
    }
    const [{ id: categoria_id }] = await insertCategoria(category)
    category.id = categoria_id
  }
  categoryMap[line[headerMap.categoria]] = category
  return category
}

const resolveDate = (date) => {
  if (!date || '' === `${date}`.trim()) return null
  if (!isNaN(date)) return new Date(date)
  if (date.match(/\d{4}-\d{2}-\d{2}/))
    return parseISO(date)
  else return parse(date, 'dd/MM/yyyy', new Date())
}
