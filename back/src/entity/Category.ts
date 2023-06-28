import { Column, Entity, PrimaryColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Category {
  @Field()
  @PrimaryColumn()
  id: number;
}
