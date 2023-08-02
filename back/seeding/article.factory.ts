import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Article } from '../src/entity/Article';

export const ArticleFactory = setSeederFactory(Article, (faker: Faker) => {
  const article = new Article();
  article.title = faker.lorem.words({ min: 1, max: 10 });
  article.description = faker.lorem.sentences(3);
  article.url = faker.internet.url();

  return article;
});
