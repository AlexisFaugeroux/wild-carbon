import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Article {
    @Field()
    @PrimaryGeneratedColumn()
    id: string;
}
