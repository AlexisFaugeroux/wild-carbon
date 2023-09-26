import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Field, ObjectType } from 'type-graphql';
import { Article } from './Article';
import { Expense } from './Expense';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  pseudo: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field(() => [Article])
  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];

  @Field(() => [User])
  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @Field(() => [Expense])
  @OneToMany(() => Expense, (expense) => expense.user)
  expenses: Expense[];
}
