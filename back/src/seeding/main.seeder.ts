import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { Article } from '../entity/Article';
import { Category } from '../entity/Category';
import { Item } from '../entity/Item';
import { User } from '../entity/User';
import { Categories } from '../enum/categoriesEnum';
import { itemsFixture } from './fixtures/items';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> {
    const userRepository = dataSource.getRepository(User);
    const articleRepository = dataSource.getRepository(Article);
    const itemRepository = dataSource.getRepository(Item);
    const categoryRespository = dataSource.getRepository(Category);

    const articleFactory = factoryManager.get(Article);
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
    const categoriesFromDb = await categoryRespository.find();

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
    const items = itemsFixture.map((itemFixture) => {
      const item = new Item();
      item.label = itemFixture.label;
      item.unit = itemFixture.unit;
      item.emissionFactor = itemFixture.emissionFactor;
      item.category = categoriesFromDb.find(
        (category) => category.name === itemFixture.category,
      )!;
      return item;
    });
    await itemRepository.save(items);
  }
}
