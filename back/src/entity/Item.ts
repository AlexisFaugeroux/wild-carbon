import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Expense } from './Expense';
import { Category } from './Category';
import UnitEnum from '../enum/unitEnum';

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
  @Column('numeric', { precision: 8, scale: 2 })
  emissionFactor: number;

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
  category: Category;

  @Field(() => Expense)
  @OneToMany(() => Expense, (expense) => expense.item)
  expenses: Expense[];
}
