import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Item } from '../src/entity/Item';

enum UnitEnum {
  KG = 'kg',
  KM = 'km',
  L = 'l',
}

export const ItemFactory = setSeederFactory(Item, (faker: Faker) => {
  const item = new Item();
  item.label = faker.lorem.word();
  item.emissionFactor = faker.lorem.word({
    length: {
      min: 1,
      max: 2,
    },
  });
  item.unit = faker.helpers.enumValue(UnitEnum);

  return item;
});
