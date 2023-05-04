import { ApolloServer } from 'apollo-server';
import 'reflect-metadata';
import path from 'node:path';
import { buildSchema } from 'type-graphql';
import { RiderResolver } from './api/graphql/resolvers/rider-resolver';
import logger from './helper/logger';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [RiderResolver],
    emitSchemaFile: path.resolve(__dirname, 'api/graphql/schema.gql'),
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen(PORT);

  logger.info(`Server started on port ${url}`);
}

bootstrap();
