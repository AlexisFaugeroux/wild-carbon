import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Item {
  @Field()
  @PrimaryGeneratedColumn()
  id: string;
}
