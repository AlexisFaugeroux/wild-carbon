import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Item } from "./Item";

@ObjectType()
@Entity()
export class Category {
  @Field()
  @PrimaryColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field(() => Item)
  @OneToMany(() => Item , (item) => item.category)
  items: Item[]
}
