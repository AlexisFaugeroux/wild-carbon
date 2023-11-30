import { AuthChecker } from 'type-graphql';
import { Context } from '..';

const customAuthChecker: AuthChecker<Context> = ({ args, context }) => {
  const {
    jwtPayload: { id: userIdFromContext },
  } = context;
  const userIdFromClient = args.userId;
  console.log('userIdFromContext', userIdFromContext);
  console.log('userIdFromClient', userIdFromClient);
  if (userIdFromContext === userIdFromClient) {
    console.log('user authorized !');
    return true;
  }
  console.log('THIS USER IS SUS, NO AUTHORIZATION');
  return false;
};

export default customAuthChecker;
