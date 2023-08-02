import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Category } from '../src/entity/Category';

export const CategoryFactory = setSeederFactory(Category, (faker: Faker) => {
  const category = new Category();

  category.name = faker.lorem.word();

  return category;
});
