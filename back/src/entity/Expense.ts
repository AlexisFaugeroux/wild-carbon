import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { User } from './User';
import { Item } from './Item';

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
  @Column('numeric', { precision: 8, scale: 2 })
  quantity: number;

  @Field()
  @Column('numeric', { precision: 8, scale: 2 })
  emissionFactorTotal: number;

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
