import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export class Expense {
  @Field()
  @PrimaryGeneratedColumn()
  id: string;
}
