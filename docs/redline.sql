--
-- ESQUEMA REDLINE FINANCE
--

DROP TABLE IF EXISTS PLANEJAMENTO;
DROP TABLE IF EXISTS MOVIMENTACAO;
DROP TABLE IF EXISTS CONTA;
DROP TABLE IF EXISTS RECORRENCIA;
DROP TABLE IF EXISTS CATEGORIA;
DROP TABLE IF EXISTS MODELOCATEGORIA;
DROP TABLE IF EXISTS TIPO_CONTA;
DROP TABLE IF EXISTS TIPO_RECORRENCIA;
DROP TABLE IF EXISTS TIPO_MOVIMENTACAO;
DROP TABLE IF EXISTS USUARIO;

CREATE TABLE USUARIO
(
    ID        INTEGER                          NOT NULL AUTO_INCREMENT,
    NOME      VARCHAR(255)                     NOT NULL,
    EMAIL     VARCHAR(255)                     NOT NULL,
    SENHA     VARCHAR(255)                     NOT NULL,
    CRIACAO   TIMESTAMP DEFAULT LOCALTIMESTAMP NOT NULL,
    ALTERACAO TIMESTAMP DEFAULT LOCALTIMESTAMP NOT NULL,
    CONSTRAINT USUARIO_PK PRIMARY KEY (ID),
    CONSTRAINT USUARIO_EMAIL_UK UNIQUE (ID)
);

CREATE TABLE TIPO_MOVIMENTACAO
(
    ID        INTEGER                          NOT NULL AUTO_INCREMENT,
    DESCRICAO VARCHAR(255)                     NOT NULL,
    CRIACAO   TIMESTAMP DEFAULT LOCALTIMESTAMP NOT NULL,
    ALTERACAO TIMESTAMP DEFAULT LOCALTIMESTAMP NOT NULL,
    CONSTRAINT TIPO_MOVIMENTACAO_PK PRIMARY KEY (ID),
    CONSTRAINT TIPO_MOVIMENTACAO_DESCRICAO_UQ UNIQUE (DESCRICAO)
);

INSERT INTO TIPO_MOVIMENTACAO (ID, DESCRICAO)
VALUES (1, 'ENTRADA'),
       (2, 'SAIDA');

CREATE TABLE TIPO_RECORRENCIA
(
    ID        INTEGER                          NOT NULL AUTO_INCREMENT,
    DESCRICAO VARCHAR(255)                     NOT NULL,
    CRIACAO   TIMESTAMP DEFAULT LOCALTIMESTAMP NOT NULL,
    ALTERACAO TIMESTAMP DEFAULT LOCALTIMESTAMP NOT NULL,
    CONSTRAINT TIPO_RECORRENCIA_PK PRIMARY KEY (ID),
    CONSTRAINT TIPO_RECORRENCIA_DESCRICAO_UQ UNIQUE (DESCRICAO)
);

INSERT INTO TIPO_RECORRENCIA (ID, DESCRICAO)
VALUES (1, 'MENSAL'),
       (2, 'ANUAL'),
       (3, 'DIARIA');

CREATE TABLE TIPO_CONTA
(
    ID        INTEGER                          NOT NULL AUTO_INCREMENT,
    DESCRICAO VARCHAR(255)                     NOT NULL,
    CRIACAO   TIMESTAMP DEFAULT LOCALTIMESTAMP NOT NULL,
    ALTERACAO TIMESTAMP DEFAULT LOCALTIMESTAMP NOT NULL,
    CONSTRAINT TIPO_CONTA_PK PRIMARY KEY (ID),
    CONSTRAINT TIPO_CONTA_DESCRICAO_UQ UNIQUE (DESCRICAO)
);

INSERT INTO TIPO_CONTA (ID, DESCRICAO)
VALUES (1, 'CARTEIRA'),
       (2, 'BANCO'),
       (3, 'CARTAO');

CREATE TABLE MODELOCATEGORIA
(
    ID        INTEGER                          NOT NULL AUTO_INCREMENT,
    DESCRICAO VARCHAR(255)                     NOT NULL,
    CRIACAO   TIMESTAMP DEFAULT LOCALTIMESTAMP NOT NULL,
    ALTERACAO TIMESTAMP DEFAULT LOCALTIMESTAMP NOT NULL,
    CONSTRAINT MODELOCATEGORIA_PK PRIMARY KEY (ID),
    CONSTRAINT MODELOCATEGORIA_DESCRICAO_UQ UNIQUE (DESCRICAO)
);

INSERT INTO MODELOCATEGORIA (DESCRICAO)
VALUES ('SALARIO'),
       ('BONUS'),
       ('EXTRA'),
       ('OUTROS'),
       ('GANHOS'),
       ('MERCADO'),
       ('RESTAURANTE'),
       ('DELIVERY'),
       ('ALUGUEL'),
       ('INTERNET'),
       ('TELEFONE'),
       ('VESTUARIO'),
       ('TRANSPORTE'),
       ('ASSINATURAS'),
       ('SERVICOS'),
       ('INVESTIMENTOS'),
       ('IMPREVISTOS'),
       ('ELETRONICOS'),
       ('LAZER'),
       ('SAUDE'),
       ('RESERVA');

CREATE TABLE CATEGORIA
(
    ID         INTEGER      NOT NULL AUTO_INCREMENT,
    DESCRICAO  VARCHAR(255) NOT NULL,
    CRIACAO    TIMESTAMP    NOT NULL DEFAULT LOCALTIMESTAMP,
    ALTERACAO  TIMESTAMP             DEFAULT LOCALTIMESTAMP NOT NULL,
    USUARIO_ID INTEGER      NOT NULL,
    CONSTRAINT CATEGORIA_PK PRIMARY KEY (ID),
    CONSTRAINT CATEGORIA_DESCRICAO_UQ UNIQUE (DESCRICAO, USUARIO_ID),
    CONSTRAINT CATEGORIA_USUARIO_FK
        FOREIGN KEY (USUARIO_ID)
            REFERENCES USUARIO (ID)
            ON DELETE CASCADE
);

CREATE TABLE RECORRENCIA
(
    ID                  INTEGER                          NOT NULL AUTO_INCREMENT,
    DESCRICAO           VARCHAR(255)                     NOT NULL,
    VALOR               NUMERIC(10, 2)                   NOT NULL,
    CRIACAO             TIMESTAMP DEFAULT LOCALTIMESTAMP NOT NULL,
    ALTERACAO           TIMESTAMP DEFAULT LOCALTIMESTAMP NOT NULL,
    INICIAL             TIMESTAMP DEFAULT LOCALTIMESTAMP NOT NULL,
    FINAL               TIMESTAMP DEFAULT LOCALTIMESTAMP NOT NULL,
    TIPO_RECORRENCIA_ID INTEGER                          NOT NULL,
    USUARIO_ID          INTEGER                          NOT NULL,
    CONSTRAINT RECORRENCIA_PK PRIMARY KEY (ID),
    CONSTRAINT RECORRENCIA_TIPO_RECORRENCIA_FK
        FOREIGN KEY (TIPO_RECORRENCIA_ID)
            REFERENCES TIPO_RECORRENCIA (ID),
    CONSTRAINT RECORRENCIA_USUARIO_ID
        FOREIGN KEY (USUARIO_ID)
            REFERENCES USUARIO (ID)
            ON DELETE CASCADE
);

CREATE TABLE CONTA
(
    ID             INTEGER                          NOT NULL AUTO_INCREMENT,
    DESCRICAO      VARCHAR(255)                     NOT NULL,
    ATIVA          BOOLEAN                          NOT NULL DEFAULT TRUE,
    CRIACAO        TIMESTAMP DEFAULT LOCALTIMESTAMP NOT NULL,
    ALTERACAO      TIMESTAMP DEFAULT LOCALTIMESTAMP NOT NULL,
    USUARIO_ID     INTEGER                          NOT NULL,
    TIPO_CONTA_ID  INTEGER                          NOT NULL,
    DIA_FECHAMENTO INTEGER,
    DIA_VENCIMENTO INTEGER,
    LIMITE         NUMERIC(10, 2),
    CONSTRAINT CONTA_PK PRIMARY KEY (ID),
    CONSTRAINT CONTA_USUARIO_FK
        FOREIGN KEY (USUARIO_ID)
            REFERENCES USUARIO (ID)
            ON DELETE CASCADE,
    CONSTRAINT CONTA_TIPO_CONTA_FK
        FOREIGN KEY (TIPO_CONTA_ID)
            REFERENCES TIPO_CONTA (ID)
);

CREATE TABLE MOVIMENTACAO
(
    ID                   INTEGER                          NOT NULL AUTO_INCREMENT,
    DESCRICAO            VARCHAR(255)                     NOT NULL,
    VALOR                NUMERIC(10, 2)                   NOT NULL,
    CRIACAO              TIMESTAMP DEFAULT LOCALTIMESTAMP NOT NULL,
    ALTERACAO            TIMESTAMP DEFAULT LOCALTIMESTAMP NOT NULL,
    VENCIMENTO           TIMESTAMP DEFAULT LOCALTIMESTAMP NOT NULL,
    EFETIVADA            TIMESTAMP,
    TIPO_MOVIMENTACAO_ID INTEGER                          NOT NULL,
    CONTA_ID             INTEGER                          NOT NULL,
    CATEGORIA_ID         INTEGER,
    RECORRENCIA_ID       INTEGER,
    CONSTRAINT MOVIMENTACAO_PK PRIMARY KEY (ID),
    CONSTRAINT MOVIMENTACAO_TIPO_MOVIMENTACAO_FK
        FOREIGN KEY (TIPO_MOVIMENTACAO_ID)
            REFERENCES TIPO_MOVIMENTACAO (ID),
    CONSTRAINT MOVIMENTACAO_CONTA_FK
        FOREIGN KEY (CONTA_ID)
            REFERENCES CONTA (ID)
            ON DELETE CASCADE,
    CONSTRAINT MOVIMENTACAO_CATEGORIA_FK
        FOREIGN KEY (CATEGORIA_ID)
            REFERENCES CATEGORIA (ID),
    CONSTRAINT MOVIMENTACAO_RECORRENCIA_FK
        FOREIGN KEY (RECORRENCIA_ID)
            REFERENCES RECORRENCIA (ID)
            ON DELETE CASCADE
);

CREATE TABLE PLANEJAMENTO
(
    ID           INTEGER                          NOT NULL AUTO_INCREMENT,
    DESCRICAO    VARCHAR(255)                     NOT NULL,
    CRIACAO      TIMESTAMP DEFAULT LOCALTIMESTAMP NOT NULL,
    ALTERACAO    TIMESTAMP DEFAULT LOCALTIMESTAMP NOT NULL,
    INICIAL      TIMESTAMP DEFAULT LOCALTIMESTAMP NOT NULL,
    FINAL        TIMESTAMP DEFAULT LOCALTIMESTAMP NOT NULL,
    LIMITE       NUMERIC(10, 2)                   NOT NULL,
    CATEGORIA_ID INTEGER                          NOT NULL,
    CONSTRAINT PLANEJAMENTO_PK PRIMARY KEY (ID),
    CONSTRAINT PLANEJAMENTO_CATEGORIA_FK
        FOREIGN KEY (CATEGORIA_ID)
            REFERENCES CATEGORIA (ID)
            ON DELETE CASCADE
);
