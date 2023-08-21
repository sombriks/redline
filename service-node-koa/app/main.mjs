import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";

import {
  planejamentoRouter,
  recorrenciaRouter,
  statusRouter,
  tipoContaRouter,
  tipoMovimentacaoRouter,
  tipoRecorrenciaRouter,
  usuarioRouter,

  listCategoriasRequest,
  findCategoriaRequest,
  insertCategoriaRequest,
  updateCategoriaRequest,
  delCategoriaRequest,
  listContasRequest,
  findContaRequest,
  insertContaRequest,
  updateContaRequest,
  delContaRequest,
  removeMovimentacaoRequest,
  updateMovimentacaoRequest,
  insertMovimentacaoRequest,
  novaSaidaRequest,
  novaEntradaRequest,
  findMovimentacaoRequest, listMovimentacaoRequest
} from "./controllers/index.mjs";
import Router from "@koa/router";
import { listModelocategoria } from "./services/index.mjs";
import { contaOwnedBy } from "./config/security/index.mjs";

export const app = new Koa();
const router = new Router();

app.use(cors()).use(bodyParser());

// TODO i miss path-group

router.get("/modelocategoria", async ctx => ctx.body = await listModelocategoria());

router.get("/:usuario_id/categoria", listCategoriasRequest);
router.get("/:usuario_id/categoria/:id", findCategoriaRequest);
router.post("/:usuario_id/categoria", insertCategoriaRequest);
router.put("/:usuario_id/categoria/:id", updateCategoriaRequest);
router.del("/:usuario_id/categoria/:id", delCategoriaRequest);

router.get("/:usuario_id/conta", listContasRequest);
router.get("/:usuario_id/conta/:id", findContaRequest);
router.post("/:usuario_id/conta", insertContaRequest);
router.put("/:usuario_id/conta/:id", updateContaRequest);
router.del("/:usuario_id/conta/:id", delContaRequest);

router.get("/:usuario_id/movimentacao", listMovimentacaoRequest);
router.get("/:usuario_id/movimentacao/:id", contaOwnedBy, findMovimentacaoRequest);
router.post("/:usuario_id/entrada/:conta_id", contaOwnedBy, novaEntradaRequest);
router.post("/:usuario_id/saida/:conta_id", contaOwnedBy, novaSaidaRequest);
router.post("/:usuario_id/movimentacao/:conta_id", contaOwnedBy, insertMovimentacaoRequest);
router.put("/:usuario_id/movimentacao/:conta_id/:id", contaOwnedBy, updateMovimentacaoRequest);
router.del("/:usuario_id/movimentacao/:conta_id/:id", contaOwnedBy, removeMovimentacaoRequest);

app.use(router.routes()).use(router.allowedMethods());

app
  .use(cors())
  .use(bodyParser())

  .use(planejamentoRouter.routes())
  .use(planejamentoRouter.allowedMethods())

  .use(recorrenciaRouter.routes())
  .use(recorrenciaRouter.allowedMethods())

  .use(statusRouter.routes())
  .use(statusRouter.allowedMethods())

  .use(tipoContaRouter.routes())
  .use(tipoContaRouter.allowedMethods())

  .use(tipoMovimentacaoRouter.routes())
  .use(tipoMovimentacaoRouter.allowedMethods())

  .use(tipoRecorrenciaRouter.routes())
  .use(tipoRecorrenciaRouter.allowedMethods())

  .use(usuarioRouter.routes())
  .use(usuarioRouter.allowedMethods());
