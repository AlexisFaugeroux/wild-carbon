import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Expense } from '../src/entity/Expense';

export const ExpenseFactory = setSeederFactory(Expense, (faker: Faker) => {
  const expense = new Expense();
  expense.title = faker.lorem.word();
  expense.quantity = faker.number.float();

  return expense;
});
