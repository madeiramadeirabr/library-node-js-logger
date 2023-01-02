# Node Js Logger

## Índice

* [Descrição](https://github.com/madeiramadeirabr/nest-js-logger/blob/production/docs/techdocs.md#descri%C3%A7%C3%A3o)
* [Configurações](https://github.com/madeiramadeirabr/nest-js-logger/blob/production/docs/techdocs.md#configura%C3%A7%C3%B5es)
  * [Instalar a biblioteca](https://github.com/madeiramadeirabr/nest-js-logger/blob/production/docs/techdocs.md#instalar-a-biblioteca)
  * [Utilizando a biblioteca](https://github.com/madeiramadeirabr/nest-js-logger/blob/production/docs/techdocs.md#utilizando-a-biblioteca)
    * [Exemplo de utilização da biblioteca](https://github.com/madeiramadeirabr/nest-js-logger/blob/production/docs/techdocs.md#exemplo-de-utiliza%C3%A7%C3%A3o-da-biblioteca)
* [Contrato das funções de disparo de logs](https://github.com/madeiramadeirabr/nest-js-logger/blob/production/docs/techdocs.md#contrato-das-fun%C3%A7%C3%B5es-de-disparo-de-logs)
* [Contribuições](https://github.com/madeiramadeirabr/nest-js-logger/blob/production/docs/techdocs.md#contribui%C3%A7%C3%B5es)

## Descrição

O Node Js Logger é uma biblioteca que implementa a padronização de logs da [MMRFC](https://madeiramadeira.atlassian.net/l/cp/an1pP602) para projetos em nodejs na madeiramadeira.

## Configurações

### Instalar a biblioteca

Para usar a biblioteca, você precisa instalar utilizando NPM ou YARN:

###### YARN

```shell
$ yarn add mm-nodejs-logger
```

###### NPM

```shell
$ npm install mm-nodejs-logger
```

### Utilizando a biblioteca

Com a biblioteca instalada e todas as configurações feitas, será necessário importá-la nos arquivos onde serão feitos os logs, injetar a dependência e em seguida chamá-la passando o evento a ser enviado.

```shell
$ import { NodeJsLoggerService } from 'mm-nodejs-logger';
```

Exemplo de uso passando o evento a ser enviado para a NewRelic como um log do tipo warn:

```shell
this.logger.warn(identifier, ContextLoggerEnum.PRODUCT_HUB_PRODUCT_SERVICE_GET_FAILED_MESSAGE);
```

###### Exemplo de utilização da biblioteca


## Contrato das funções de disparo de logs

A biblioteca criará logs com padrão MMRFC com os seguintes modelos de resposta:

```shell
error(message: any, context?: string): void; // Equivalente a error no winston

log(message: any, context?: string): void; // Equivalente a info no winston

warn(message: any, context?: string): void; // Equivalente a warn no winston

debug(message: any, context?: string): void; // Equivalente a debug no winston
```

## Contribuições

[Catalog](https://github.com/orgs/madeiramadeirabr/teams/squad-catalog-admin)

* [Pedro Fellipe Melo](https://github.com/PedroFellipe)
* [Felipe Jhordan](https://github.com/FelipeJhordan)
* [Camila Damásio](https://github.com/CamilaDamasio)
