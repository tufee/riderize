import { ApolloServer } from 'apollo-server';
import path from 'node:path';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { InscriptionResolver } from './api/graphql/resolvers/inscription-resolver';
import { RideResolver } from './api/graphql/resolvers/ride-resolver';
import { UserResolver } from './api/graphql/resolvers/user-resolver';
import { AuthenticationJwt } from './helper/authentication-jwt';
import logger from './helper/logger';

const PORT = process.env.PORT || 3000;

export async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [RideResolver, UserResolver, InscriptionResolver],
    emitSchemaFile: path.resolve(__dirname, 'api/graphql/schema.gql'),
    container: Container,
    authChecker: new AuthenticationJwt().authenticate
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      return {
        req,
        token: req?.headers?.authorization
      };
    }
  });

  const { url } = await server.listen(PORT);

  logger.info(`Server started on port ${url}`);

  return server;
}

bootstrap();
