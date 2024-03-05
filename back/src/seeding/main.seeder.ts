import { faker } from '@faker-js/faker';
import * as argon2 from 'argon2';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Article } from '../entity/Article';
import { Category } from '../entity/Category';
import { Item } from '../entity/Item';
import { User } from '../entity/User';
import { articlesFixture } from './fixtures/articles';
import { categoriesFixture } from './fixtures/categories';
import { itemsFixture } from './fixtures/items';
import { usersFixture } from './fixtures/users';

export class MainSeeder implements Seeder {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async run(dataSource: DataSource): Promise<any> {
    const userRepository = dataSource.getRepository(User);
    const articleRepository = dataSource.getRepository(Article);
    const itemRepository = dataSource.getRepository(Item);
    const categoryRespository = dataSource.getRepository(Category);

    console.log('Seeding: Processing Users...');
    const hashedPassword = await Promise.all(
      usersFixture.map((userFixture) => argon2.hash(userFixture.password)),
    );
    const users = usersFixture.map((userFixture, index) => {
      const user = new User();
      user.pseudo = userFixture.pseudo;
      user.email = userFixture.email;
      user.password = hashedPassword[index];

      return user;
    });
    users.forEach((user) => {
      const friends = faker.helpers.arrayElements(users, {
        min: 0,
        max: 2,
      });
      user.users = friends;
    });
    await userRepository.save(users);

    console.log('Seeding: Processing Categories...');
    await categoryRespository.save(categoriesFixture);
    const categoriesFromDb = await categoryRespository.find();

    console.log('Seeding: Processing Articles...');
    const articles = articlesFixture.map((articleFixture, index) => {
      const article = new Article();
      article.title = articleFixture.title;
      article.description = articleFixture.description;
      article.url = articleFixture.url;
      article.createdAt = new Date();
      article.user = users[index];

      return article;
    });
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
