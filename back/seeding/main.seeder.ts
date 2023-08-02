import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { Article } from '../src/entity/Article';
import { Category } from '../src/entity/Category';
import { Expense } from '../src/entity/Expense';
import { Item } from '../src/entity/Item';
import { User } from '../src/entity/User';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {}
}
