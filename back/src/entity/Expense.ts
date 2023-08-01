import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany, ManyToOne } from "typeorm";
import { ObjectType, Field, Float } from "type-graphql";
import { User } from "./User";
import { Item } from "./Item";

@ObjectType()
@Entity()
export class Expense {

  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  quantity: number;

  @Field(() => Float!, { nullable: true })
  @Column()
  emissionFactor: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.expenses)
  user: User;

  @Field(() => Item)
  @ManyToOne(() => Item, (item) => item.expenses)
  item: Item;

}
