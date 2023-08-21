import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";

import {
  contaRouter,
  modelocategoriaRouter,
  movimentacaoRouter,
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
  delCategoriaRequest
} from "./controllers/index.mjs";
import Router from "@koa/router";

export const app = new Koa();
const router = new Router();

app.use(cors()).use(bodyParser());

// TODO i miss path-group

router.get("/:usuario_id/categoria", listCategoriasRequest);
router.get("/:usuario_id/categoria/:id", findCategoriaRequest);
router.post("/:usuario_id/categoria", insertCategoriaRequest);
router.put("/:usuario_id/categoria/:id", updateCategoriaRequest);
router.del("/:usuario_id/categoria/:id", delCategoriaRequest);

app.use(router.routes()).use(router.allowedMethods());

app
  .use(cors())
  .use(bodyParser())

  .use(contaRouter.routes())
  .use(contaRouter.allowedMethods())

  .use(modelocategoriaRouter.routes())
  .use(modelocategoriaRouter.allowedMethods())

  .use(movimentacaoRouter.routes())
  .use(movimentacaoRouter.allowedMethods())

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
