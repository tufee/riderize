# Desafio Backend - Riderize

## Ferramentas utilizadas

- Apollo Server;
- TypeGraphQL;
- Prisma;
- Docker;
- Docker Compose;
- Jest;
- JWT;

## Rodando o projeto

Dentro do diretório do projeto, use os seguintes comandos:

```
npm install
docker compose up -d
npm run prisma:dev
npm run dev
```

A API está configurada para utilizar a porta 3000.

## Documentação

Você pode acessar as informações da API na seguinte rota:

```
http://localhost:3000/graphql
```

## Testes

Você pode utilizar o seguinte comando para verificar os testes da aplicação:

```
npm run test
```

Você pode utilizar o seguinte comando para verificar a cobertura de testes da aplicação:

```
npm run coverage
```