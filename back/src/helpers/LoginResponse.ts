import { Field, ObjectType } from 'type-graphql';
import { User } from '../entity/User';

@ObjectType()
export default class LoginResponse {
  @Field(() => User, { nullable: true })
  user: User | null;

  @Field()
  token: string;

  @Field()
  success: boolean;
}
