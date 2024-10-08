import Koa from "koa";
import cors from "@koa/cors";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";

import {
  delCategoriaRequest,
  delContaRequest,
  delPlanejamentoRequest,
  delRecorrenciaRequest,
  delUsuarioRequest,
  downloadMovimentacoesRequest,
  findCategoriaRequest,
  findContaRequest,
  findMovimentacaoRequest,
  findRecorrenciaRequest,
  geraLancamentosRequest,
  getDashboardRequest,
  insertCategoriaRequest,
  insertContaRequest,
  insertMovimentacaoRequest,
  insertPlanejamentoRequest,
  insertRecorrenciaRequest,
  listCategoriasRequest,
  listContasRequest,
  listMovimentacaoRequest,
  listPlanejamentoRequest,
  listRecorrenciaRequest,
  pagamentoRequest,
  removeMovimentacaoRequest,
  transferenciaRequest,
  updateCategoriaRequest,
  updateContaRequest,
  updateMovimentacaoRequest,
  updatePlanejamentoRequest,
  updateRecorrenciaRequest,
  updateUserRequest,
  uploadMovimentacoesRequest, userConfirmRequest,
  userLoginRequest,
  userSignupRequest,
} from "./controllers/index.mjs";
import {
  listModelocategoria,
  listTipoConta,
  listTipoMovimentacao,
  listTipoRecorrencia,
} from "./services/index.mjs";
import {contaOwnedBy, ifAuthenticated} from "./config/security/index.mjs";

import ApiBuilder from "koa-api-builder";
import {errHandler} from "./config/default-error-handler.mjs";
import {cabin} from "./config/base-logging.mjs";

export const app = new Koa();
const router = new Router();

app.use(cabin.middleware).use(errHandler).use(cors()).use(bodyParser());

new ApiBuilder({router})
  .path((b) => {
    b.get("/status", async (ctx) => (ctx.body = "ONLINE"));
    b.get("/tipo-conta", async (ctx) => (ctx.body = await listTipoConta()));
    b.get("/modelocategoria", async (ctx) => (ctx.body = await listModelocategoria()));
    b.get("/tipo-recorrencia", async (ctx) => (ctx.body = await listTipoRecorrencia()));
    b.get("/tipo-movimentacao", async (ctx) => (ctx.body = await listTipoMovimentacao()));

    b.post("/login", userLoginRequest);
    b.post("/signup", userSignupRequest);
    b.put("/confirma-cadastro", userConfirmRequest);

    b.path("/:usuario_id", ifAuthenticated, (b) => {
      b.del("/removeAccount", delUsuarioRequest);
      b.put("/updateUser", updateUserRequest);
      b.path("/categoria", (b) => {
        b.get(listCategoriasRequest);
        b.post(insertCategoriaRequest);
        b.path("/:id", (b) => {
          b.get(findCategoriaRequest);
          b.put(updateCategoriaRequest);
          b.del(delCategoriaRequest);
        });
      });

      b.path("/conta", (b) => {
        b.get(listContasRequest);
        b.post(insertContaRequest);
        b.path("/:id", (b) => {
          b.get(findContaRequest);
          b.put(updateContaRequest);
          b.del(delContaRequest);
        });
      });

      b.path("/movimentacao", (b) => {
        b.get(listMovimentacaoRequest);
        b.get("/download", downloadMovimentacoesRequest);
        b.post("/upload", uploadMovimentacoesRequest);
        b.path("/:conta_id", contaOwnedBy, (b) => {
          b.post(insertMovimentacaoRequest);
          b.post("/transferir/:conta_destino_id", transferenciaRequest);
          b.post("/pagar/:conta_destino_id", pagamentoRequest);
          b.path("/:id", (b) => {
            b.get(findMovimentacaoRequest);
            b.put(updateMovimentacaoRequest);
            b.del(removeMovimentacaoRequest);
          });
        });
      });

      b.path("/planejamento", (b) => {
        b.get(listPlanejamentoRequest);
        b.post(insertPlanejamentoRequest);
        b.path("/:id", (b) => {
          b.del(delPlanejamentoRequest);
          b.put(updatePlanejamentoRequest);
        });
      });

      b.path("/recorrencia", (b) => {
        b.get(listRecorrenciaRequest);
        b.post(insertRecorrenciaRequest);
        b.path("/:id", (b) => {
          b.get(findRecorrenciaRequest);
          b.put(updateRecorrenciaRequest);
          b.del(delRecorrenciaRequest);
          b.get("/lancamentos", geraLancamentosRequest);
        });
      });

      b.get("/dashboard", getDashboardRequest);
    });
  })
  .build();

app.use(router.routes()).use(router.allowedMethods());
