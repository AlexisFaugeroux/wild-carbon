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
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT ?? '', 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
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
  const userRepository = dataSource.getRepository(User);

  const tableExists = (
    await userRepository.manager.query(
      `SELECT EXISTS (
        SELECT FROM pg_tables
          WHERE schemaname = 'public'
          AND tablename = 'user'
          )`,
    )
  )[0].exists;

  if (tableExists) {
    const tableHasRecords = await userRepository
      .createQueryBuilder('user')
      .getExists();

    if (tableHasRecords) {
      dataSource.destroy();
      return console.log('Database is not empty. Seeding skipped');
    }
  }

  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  console.log('Seeding complete !');
  dataSource.destroy();
});
