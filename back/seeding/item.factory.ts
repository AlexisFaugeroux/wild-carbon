import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Item } from '../src/entity/Item';
import UnitEnum from '../src/enum/unitEnum';

export const ItemFactory = setSeederFactory(Item, (faker: Faker) => {
  const item = new Item();
  item.label = faker.lorem.word();
  item.emissionFactor = faker.number.float();
  item.unit = faker.helpers.enumValue(UnitEnum);

  return item;
});
