import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";

@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;
}
