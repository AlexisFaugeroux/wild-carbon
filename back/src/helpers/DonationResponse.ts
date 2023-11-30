import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class DonationResponse {
  @Field()
  amount: number;
}
