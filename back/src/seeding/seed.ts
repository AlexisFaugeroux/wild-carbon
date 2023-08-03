import * as dotenv from 'dotenv';
import 'reflect-metadata';

import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';

import { Article } from '../entity/Article';
import { Category } from '../entity/Category';
import { Expense } from '../entity/Expense';
import { Item } from '../entity/Item';
import { User } from '../entity/User';

import { ArticleFactory } from './article.factory';
import { CategoryFactory } from './category.factory';
import { ExpenseFactory } from './expense.factory';
import { ItemFactory } from './item.factory';
import { UserFactory } from './user.factory';

import { MainSeeder } from './main.seeder';

dotenv.config();

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: 'carbone',
  entities: [Article, Category, Expense, Item, User],
  factories: [
    ArticleFactory,
    CategoryFactory,
    ExpenseFactory,
    ItemFactory,
    UserFactory,
  ],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(options);

dataSource
  .initialize()
  .then(async () => {
    await dataSource.synchronize(true);
    await runSeeders(dataSource);
    console.log('Seeding complete !');
    return dataSource.destroy();
  })
  .then(() => console.log('connection closed'));
