import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, ManyToOne, OneToMany } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Expense } from "./Expense";
import { Category } from "./Category";
import { User } from "./User";

enum UnitEnum{
  KG = "kg",
  KM = "km",
  L = "l"
}

@ObjectType()
@Entity()
export class Item {

  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  label: string;

  @Field()
  @Column()
  emissionFactor: string;

  @Field()
  @Column()
  unit: UnitEnum;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.items)
  category: Category

  @Field(() => Expense)
  @OneToMany(() => Expense, (expense) => expense.item)
  expenses: Expense[];
}
