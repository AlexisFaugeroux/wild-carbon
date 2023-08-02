import 'reflect-metadata';
import * as jwt from 'jsonwebtoken';
import dataSource from './utils';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import UserResolver from './resolver/UserResolver';
import CategoryResolver from './resolver/CategoryResolver';
import ArticleResolver from './resolver/ArticleResolver';
import ExpenseResolver from './resolver/ExpenseResolver';
import ItemResolver from './resolver/ItemResolver';
import { User } from './entity/User';

export interface Context {
  jwtPayload: User;
}

const start = async (): Promise<void> => {
  await dataSource.initialize();

  const typeGraphQLgeneratedSchema = await buildSchema({
    resolvers: [
      UserResolver,
      CategoryResolver,
      ArticleResolver,
      ExpenseResolver,
      ItemResolver,
    ],
    authChecker: ({ context }) => {
      console.log('context from authchecker', context);
      if (context.email !== undefined) {
        return true;
      } else {
        return false;
      }
    },
  });

  const server = new ApolloServer({
    schema: typeGraphQLgeneratedSchema,
    context: async ({ req }) => {
      if (
        req.headers.authorization === undefined ||
        req.headers.authorization === ''
      )
        throw new Error('Authorization headers not set');

      const payload = jwt.verify(
        req.headers.authorization.split('Bearer ')[1],
        'supersecretkey',
      ) as User;
      return { jwtPayload: payload };
    },
  });

  const { url } = await server.listen();
  console.log(`🚀  Server ready at ${url}`);
  console.log('hello hot reload ?');
};

void start();
