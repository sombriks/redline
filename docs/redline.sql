--
-- initial database schema for reference. for updated schema see the knex
-- migrations in service-node-koa/app/config/db/migrations
--

create table modelocategoria
(
    id        integer                                not null
        primary key autoincrement,
    descricao varchar(255)                           not null,
    cor       varchar(255) default '#f00'            not null,
    criacao   datetime     default CURRENT_TIMESTAMP not null,
    alteracao datetime     default CURRENT_TIMESTAMP not null
);

create unique index modelocategoria_descricao_unique
    on modelocategoria (descricao);

create table tipo_conta
(
    id        integer                            not null
        primary key,
    descricao varchar(255)                       not null,
    criacao   datetime default CURRENT_TIMESTAMP not null,
    alteracao datetime default CURRENT_TIMESTAMP not null
);

create unique index tipo_conta_descricao_unique
    on tipo_conta (descricao);

create table tipo_movimentacao
(
    id        integer                            not null
        primary key,
    descricao varchar(255)                       not null,
    criacao   datetime default CURRENT_TIMESTAMP not null,
    alteracao datetime default CURRENT_TIMESTAMP not null
);

create unique index tipo_movimentacao_descricao_unique
    on tipo_movimentacao (descricao);

create table tipo_recorrencia
(
    id        integer                            not null
        primary key,
    descricao varchar(255)                       not null,
    criacao   datetime default CURRENT_TIMESTAMP not null,
    alteracao datetime default CURRENT_TIMESTAMP not null
);

create unique index tipo_recorrencia_descricao_unique
    on tipo_recorrencia (descricao);

create table usuario
(
    id        integer                            not null
        primary key autoincrement,
    nome      varchar(255)                       not null,
    email     varchar(255)                       not null,
    senha     varchar(255)                       not null,
    admin     boolean  default '0'               not null,
    criacao   datetime default CURRENT_TIMESTAMP not null,
    alteracao datetime default CURRENT_TIMESTAMP not null
);

create table categoria
(
    id         integer                                not null
        primary key autoincrement,
    descricao  varchar(255)                           not null,
    cor        varchar(255) default '#f00'            not null,
    criacao    datetime     default CURRENT_TIMESTAMP not null,
    alteracao  datetime     default CURRENT_TIMESTAMP not null,
    usuario_id integer                                not null
        references usuario
            on delete cascade
);

create unique index categoria_descricao_usuario_id_unique
    on categoria (descricao, usuario_id);

create table conta
(
    id             integer                                not null
        primary key autoincrement,
    descricao      varchar(255)                           not null,
    ativa          boolean      default '1'               not null,
    cor            varchar(255) default '#f00'            not null,
    criacao        datetime     default CURRENT_TIMESTAMP not null,
    alteracao      datetime     default CURRENT_TIMESTAMP not null,
    usuario_id     integer                                not null
        references usuario
            on delete cascade,
    tipo_conta_id  integer                                not null
        references tipo_conta,
    dia_fechamento integer,
    dia_vencimento integer,
    limite         float
);

create table planejamento
(
    id           integer                            not null
        primary key autoincrement,
    descricao    varchar(255)                       not null,
    criacao      datetime default CURRENT_TIMESTAMP not null,
    alteracao    datetime default CURRENT_TIMESTAMP not null,
    inicial      datetime default CURRENT_TIMESTAMP not null,
    final        datetime default CURRENT_TIMESTAMP not null,
    categoria_id integer                            not null
        references categoria
            on delete cascade,
    limite       float                              not null
);

create table recorrencia
(
    id                  integer                            not null
        primary key autoincrement,
    descricao           varchar(255)                       not null,
    valor               float                              not null,
    criacao             datetime default CURRENT_TIMESTAMP not null,
    alteracao           datetime default CURRENT_TIMESTAMP not null,
    inicial             datetime default CURRENT_TIMESTAMP not null,
    final               datetime default CURRENT_TIMESTAMP not null,
    tipo_recorrencia_id integer                            not null
        references tipo_recorrencia,
    usuario_id          integer                            not null
        references usuario
            on delete cascade
);

create table movimentacao
(
    id                   integer                            not null
        primary key autoincrement,
    descricao            varchar(255)                       not null,
    valor                float                              not null,
    criacao              datetime default CURRENT_TIMESTAMP not null,
    alteracao            datetime default CURRENT_TIMESTAMP not null,
    vencimento           datetime default CURRENT_TIMESTAMP not null,
    efetivada            datetime,
    tipo_movimentacao_id integer                            not null
        references tipo_movimentacao,
    conta_id             integer                            not null
        references conta
            on delete cascade,
    categoria_id         integer
                                                            references categoria
                                                                on delete set null,
    recorrencia_id       integer
        references recorrencia
            on delete cascade
);

create unique index usuario_email_unique
    on usuario (email);

