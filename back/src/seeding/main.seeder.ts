import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { Article } from '../entity/Article';
import { Category } from '../entity/Category';
import { Expense } from '../entity/Expense';
import { Item } from '../entity/Item';
import { User } from '../entity/User';
import { Categories } from '../enum/categoriesEnum';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userRepository = dataSource.getRepository(User);
    const articleRepository = dataSource.getRepository(Article);
    const itemRepository = dataSource.getRepository(Item);
    const expenseRepository = dataSource.getRepository(Expense);
    const categoryRespository = dataSource.getRepository(Category);

    const articleFactory = factoryManager.get(Article);
    const expenseFactory = factoryManager.get(Expense);
    const itemFactory = factoryManager.get(Item);
    const userFactory = factoryManager.get(User);

    console.log('Seeding: Processing Users...');
    const users = await userFactory.saveMany(10);
    users.forEach((user) => {
      const friends = faker.helpers.arrayElements(users, {
        min: 0,
        max: 8,
      });
      user.users = friends;
    });
    await userRepository.save(users);

    console.log('Processing Categories...');
    const categoriesArray: Categories[] = [];
    Object.values(Categories).forEach((cat) => categoriesArray.push(cat));
    const categories = Array(4)
      .fill('')
      .map((_, index) => {
        const category = new Category();
        category.name = categoriesArray[index];
        return category;
      });
    await categoryRespository.save(categories);

    console.log('Seeding: Processing Articles...');
    const articles = await Promise.all(
      Array(6)
        .fill('')
        .map(async () => {
          const article = await articleFactory.make({
            user: faker.helpers.arrayElement(users),
          });
          return article;
        }),
    );
    await articleRepository.save(articles);

    console.log('Seeding: Processing Items...');
    const items = await Promise.all(
      Array(50)
        .fill('')
        .map(async () => {
          const item = await itemFactory.make({
            category: faker.helpers.arrayElement(categories),
          });
          return item;
        }),
    );
    await itemRepository.save(items);

    console.log('Seeding: Processing Expenses...');
    const expenses = await Promise.all(
      Array(30)
        .fill('')
        .map(async () => {
          const expense = await expenseFactory.make({
            user: faker.helpers.arrayElement(users),
            item: faker.helpers.arrayElement(items),
          });
          return expense;
        }),
    );
    await expenseRepository.save(expenses);
  }
}
