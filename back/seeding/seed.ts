import * as dotenv from 'dotenv';
import 'reflect-metadata';

import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';

import { Article } from '../src/entity/Article';
import { Category } from '../src/entity/Category';
import { Expense } from '../src/entity/Expense';
import { Item } from '../src/entity/Item';
import { User } from '../src/entity/User';

import { ArticleFactory } from './article.factory';
import { CategoryFactory } from './category.factory';
import { ExpenseFactory } from './expense.factory';
import { ItemFactory } from './item.factory';
import { UserFactory } from './user.factory';

import { MainSeeder } from './main.seeder';

dotenv.config();

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.USERNAME_DB,
  password: process.env.PASSWORD_DB,
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

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  console.log('Seeding complete !');
  process.exit();
});
