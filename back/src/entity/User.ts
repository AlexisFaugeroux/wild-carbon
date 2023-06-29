import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Article } from "./Article";
import { Expense } from "./Expense";
import { Item } from "./Item";

@Entity()
export class User {

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  pseudo: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field(() => Article)
  @OneToMany(() => Article , (article) => article.user)
  articles: Article[];

  @Field(() => User)
  @ManyToMany (() => User )
  @JoinTable()
  users: User[];

  @Field(() => Expense)
  @OneToMany( () => Expense, (expense) => expense.user)
  expenses: Expense[];
}
