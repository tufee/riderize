import '@types/jest';
import { ApolloServer } from 'apollo-server';
import path from 'node:path';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { RiderResolver } from './api/graphql/resolvers/rider-resolver';
import { UserResolver } from './api/graphql/resolvers/user-resolver';
import logger from './helper/logger';

const PORT = process.env.PORT || 3000;

export async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [RiderResolver, UserResolver],
    emitSchemaFile: path.resolve(__dirname, 'api/graphql/schema.gql'),
    validate: false,
    container: Container,
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen(PORT);

  logger.info(`Server started on port ${url}`);

  return server;
}

bootstrap();
