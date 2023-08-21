import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";

import {
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
  findMovimentacaoRequest,
  listMovimentacaoRequest,
  listPlanejamentoRequest,
  listRecorrenciaRequest,
  userLoginRequest,
  userSignupRequest,
  delUsuarioRequest
} from "./controllers/index.mjs";
import Router from "@koa/router";
import {
  listModelocategoria,
  listTipoConta,
  listTipoMovimentacao,
  listTipoRecorrencia
} from "./services/index.mjs";
import { contaOwnedBy, ifAuthenticated } from "./config/security/index.mjs";

export const app = new Koa();
const router = new Router();

app.use(cors()).use(bodyParser());

// TODO i miss path-group

router.get("/modelocategoria", async ctx => ctx.body = await listModelocategoria());

router.get("/tipo-conta", async ctx => ctx.body = await listTipoConta());

router.get("/tipo-movimentacao", async ctx => ctx.body = await listTipoMovimentacao());

router.get("/tipo_recorrencia", async ctx => ctx.body = await listTipoRecorrencia());

router.get("/status", async ctx => ctx.body = "ONLINE");

router.post("/login", userLoginRequest);
router.post("/signup", userSignupRequest);
router.del("/:usuario_id/removeAccount", ifAuthenticated, delUsuarioRequest);

router.get("/:usuario_id/categoria", ifAuthenticated, listCategoriasRequest);
router.get("/:usuario_id/categoria/:id", ifAuthenticated, findCategoriaRequest);
router.post("/:usuario_id/categoria", ifAuthenticated, insertCategoriaRequest);
router.put("/:usuario_id/categoria/:id", ifAuthenticated, updateCategoriaRequest);
router.del("/:usuario_id/categoria/:id", ifAuthenticated, delCategoriaRequest);

router.get("/:usuario_id/conta", ifAuthenticated, listContasRequest);
router.get("/:usuario_id/conta/:id", ifAuthenticated, findContaRequest);
router.post("/:usuario_id/conta", ifAuthenticated, insertContaRequest);
router.put("/:usuario_id/conta/:id", ifAuthenticated, updateContaRequest);
router.del("/:usuario_id/conta/:id", ifAuthenticated, delContaRequest);

router.get("/:usuario_id/movimentacao", ifAuthenticated, listMovimentacaoRequest);
router.get("/:usuario_id/movimentacao/:id", ifAuthenticated, findMovimentacaoRequest);
router.post("/:usuario_id/movimentacao/:conta_id", ifAuthenticated, contaOwnedBy, insertMovimentacaoRequest);
router.post("/:usuario_id/entrada/:conta_id", ifAuthenticated, contaOwnedBy, novaEntradaRequest);
router.post("/:usuario_id/saida/:conta_id", ifAuthenticated, contaOwnedBy, novaSaidaRequest);
router.put("/:usuario_id/movimentacao/:conta_id/:id", ifAuthenticated, contaOwnedBy, updateMovimentacaoRequest);
router.del("/:usuario_id/movimentacao/:conta_id/:id", ifAuthenticated, contaOwnedBy, removeMovimentacaoRequest);

router.get("/:usuario_id/planejamento", ifAuthenticated, listPlanejamentoRequest);

router.get("/:usuario_id/recorrencia", ifAuthenticated, listRecorrenciaRequest);

app.use(router.routes()).use(router.allowedMethods());
