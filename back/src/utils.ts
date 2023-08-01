import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm';
import { Item } from './entity/Item';
import { Article } from './entity/Article';
import { User } from './entity/User';
import { Expense } from './entity/Expense';
import { Category } from './entity/Category';

dotenv.config();
if(!process.env.PASSWORD_DB){
    console.log("Y'A RIEEEEN");
}

const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: 'carbone',
    synchronize: true,
    entities: [Item, Article, User, Expense, Category],
});

export default dataSource;