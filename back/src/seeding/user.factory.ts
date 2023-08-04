import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { User } from '../entity/User';

export const UserFactory = setSeederFactory(User, (faker: Faker) => {
  const user = new User();
  user.pseudo = faker.internet.userName();
  user.email = faker.internet.email();
  user.password = faker.internet.password();

  return user;
});
