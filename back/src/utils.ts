import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Article } from './entity/Article';
import { Category } from './entity/Category';
import { Expense } from './entity/Expense';
import { Item } from './entity/Item';
import { User } from './entity/User';

dotenv.config();
if (!process.env.POSTGRES_PASSWORD || !process.env.POSTGRES_USER) {
  console.log('Please set your own username and password in a .env file');
}

const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: 'carbone',
  synchronize: true,
  entities: [Item, Article, User, Expense, Category],
  logging: ['schema', 'error'],
});

export default dataSource;
