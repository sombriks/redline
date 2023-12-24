import Koa from "koa";
import cors from "@koa/cors";
import Cabin from "cabin";
import Signale from "signale/signale.js";
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
import {contaOwnedBy, ifAuthenticated} from "./config/security/index.mjs";

import ApiBuilder from "koa-api-builder";

export const app = new Koa();
const router = new Router();

const cabin = new Cabin({logger: new Signale()})

app.use(cors()).use(bodyParser()).use(cabin.middleware);

ApiBuilder({router}).path(b => {
  b.get("/status", async ctx => ctx.body = "ONLINE");
  b.get("/tipo-conta", async ctx => ctx.body = await listTipoConta());
  b.get("/modelocategoria", async ctx => ctx.body = await listModelocategoria());
  b.get("/tipo-recorrencia", async ctx => ctx.body = await listTipoRecorrencia());
  b.get("/tipo-movimentacao", async ctx => ctx.body = await listTipoMovimentacao());

  b.post("/login", userLoginRequest);
  b.post("/signup", userSignupRequest);

  b.path("/:usuario_id", ifAuthenticated, b => {
    b.del("/removeAccount", delUsuarioRequest);

    b.path("/categoria", b => {
      b.get(listCategoriasRequest);
      b.post(insertCategoriaRequest);
      b.path("/:id", b => {
        b.get(findCategoriaRequest);
        b.put(updateCategoriaRequest);
        b.del(delCategoriaRequest);
      })
    });

    b.path("/conta", b => {
      b.get(listContasRequest);
      b.post(insertContaRequest);
      b.path("/:id", b => {
        b.get(findContaRequest);
        b.put(updateContaRequest);
        b.del(delContaRequest);
      });
    });

    b.path("/movimentacao", b => {
      b.get(listMovimentacaoRequest);
      b.path("/:conta_id", contaOwnedBy, b => {
        b.post(insertMovimentacaoRequest);
        b.path("/:id", b => {
          b.get(findMovimentacaoRequest);
          b.put(updateMovimentacaoRequest);
          b.del(removeMovimentacaoRequest);
        });
      });
    });

    b.path("/planejamento", b => b.get(listPlanejamentoRequest));

    b.path("/recorrencia", b => b.get(listRecorrenciaRequest));
  });
}).build();

// router.post("/:usuario_id/entrada/:conta_id", ifAuthenticated, contaOwnedBy, novaEntradaRequest);
// router.post("/:usuario_id/saida/:conta_id", ifAuthenticated, contaOwnedBy, novaSaidaRequest);

app.use(router.routes()).use(router.allowedMethods());
