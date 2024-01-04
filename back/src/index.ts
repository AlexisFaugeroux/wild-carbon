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
import DonationResolver from './resolver/DonationResolver';

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
      DonationResolver,
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
      ) {
        return { message: 'No authorization headers set' };
      }

      const token = req.headers.authorization.split('Bearer ')[1];
      if (!token) {
        return { message: 'Invalid authorization token' };
      }

      const jwtKey = process.env.JWT_KEY;
      if (!jwtKey) {
        return { message: 'Invalid key' };
      }

      const payload = jwt.verify(token, jwtKey) as User;

      if (!payload.id || !payload.pseudo || !payload.email) {
        return { message: 'Invalid user payload' };
      }

      return {
        dataSource,
        jwtPayload: payload,
      }; 
    },
  });

  const { url } = await server.listen();
  console.log(`🚀  Server ready at ${url}`);
};

void start();