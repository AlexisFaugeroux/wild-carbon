import { faker } from '@faker-js/faker';
import { Expense } from '../../entity/Expense';
import { Item } from '../../entity/Item';
import { User } from '../../entity/User';
import ExpenseResolver from '../ExpenseResolver';

const resolver = new ExpenseResolver();

type TestExpense = Omit<Expense, 'user' | 'item' | 'updatedAt'>;

const MOCKED_USERS: Pick<User, 'id'>[] = [
  {
    id: faker.string.uuid(),
  },
  {
    id: faker.string.uuid(),
  },
];

const MOCKED_ITEMS: Pick<Item, 'id' | 'emissionFactor'>[] = [
  {
    id: faker.string.uuid(),
    emissionFactor: faker.number.float({ precision: 2 }),
  },
  {
    id: faker.string.uuid(),
    emissionFactor: faker.number.float({ precision: 2 }),
  },
];

const MOCKED_EXPENSES: (TestExpense & {
  user: (typeof MOCKED_USERS)[number];
  item: (typeof MOCKED_ITEMS)[number];
})[] = [
  {
    id: faker.string.uuid(),
    emissionTotal: faker.number.float({ precision: 0.01 }),
    title: faker.lorem.words({ min: 1, max: 5 }),
    quantity: faker.number.float({ precision: 0.01 }),
    user: MOCKED_USERS[0],
    item: MOCKED_ITEMS[0],
    createdAt: faker.date.past(),
  },
  {
    id: faker.string.uuid(),
    emissionTotal: faker.number.float({ precision: 0.01 }),
    title: faker.lorem.words({ min: 1, max: 5 }),
    quantity: faker.number.float({ precision: 0.01 }),
    user: MOCKED_USERS[1],
    item: MOCKED_ITEMS[0],
    createdAt: faker.date.past(),
  },
  {
    id: faker.string.uuid(),
    emissionTotal: faker.number.float({ precision: 0.01 }),
    title: faker.lorem.words({ min: 1, max: 5 }),
    quantity: faker.number.float({ precision: 0.01 }),
    user: MOCKED_USERS[0],
    item: MOCKED_ITEMS[1],
    createdAt: faker.date.past(),
  },
];

const MOCKED_QUERIES = {
  EXPENSE_ENTITY: {
    findOne: jest.fn().mockImplementation((input) => {
      const {
        where: { id },
      } = input;
      return new Promise((resolve) => {
        if (!id || id !== MOCKED_EXPENSES[1].id) {
          resolve(null);
        }
        resolve(MOCKED_EXPENSES[1]);
      });
    }),
    find: jest.fn().mockResolvedValue(MOCKED_EXPENSES),
    findOneByOrFail: jest.fn().mockImplementation(({ id }) => {
      return new Promise((resolve, rejects) => {
        if (!id || id !== MOCKED_EXPENSES[1].id) {
          rejects(new Error());
        }
        resolve(MOCKED_EXPENSES[1]);
      });
    }),
    save: jest.fn().mockResolvedValue(MOCKED_EXPENSES[1]),
    remove: jest.fn().mockResolvedValue(MOCKED_EXPENSES[2]),
  },
  USER_ENTITY: {
    findOne: jest.fn().mockImplementation((input) => {
      const {
        where: { id },
      } = input;
      if (!id || id !== MOCKED_USERS[0].id) {
        return null;
      }
      return MOCKED_USERS[0].id;
    }),
    findOneByOrFail: jest.fn().mockImplementation(({ id }) => {
      return new Promise((resolve, rejects) => {
        if (!id || id !== MOCKED_USERS[1].id) {
          rejects(new Error("You're not the owner of this expense"));
        }
        resolve(MOCKED_USERS[1]);
      });
    }),
  },
  ITEM_ENTITY: {
    findOneByOrFail: jest.fn().mockImplementation(({ id }) => {
      return new Promise((resolve, rejects) => {
        if (!id || id !== MOCKED_ITEMS[0].id) {
          rejects(new Error('Item not found'));
        }
        resolve(MOCKED_ITEMS[0]);
      });
    }),
  },
};

jest.mock('typeorm', () => {
  const actual = jest.requireActual('typeorm');
  return {
    ...actual,
    DataSource: jest.fn().mockImplementation(() => {
      const { datasource } = actual;
      return {
        ...datasource,
        getRepository: jest.fn().mockImplementation((entity) => {
          if (entity === Expense) {
            return MOCKED_QUERIES.EXPENSE_ENTITY;
          } else if (entity === User) {
            return MOCKED_QUERIES.USER_ENTITY;
          } else if (entity === Item) {
            return MOCKED_QUERIES.ITEM_ENTITY;
          }
        }),
      };
    }),
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('getExpense', () => {
  it('should return an Expense object', async () => {
    const payload = {
      id: MOCKED_EXPENSES[1].id,
    };
    const response = await resolver.getExpense(payload.id);

    expect(MOCKED_QUERIES.EXPENSE_ENTITY.findOne).toHaveBeenCalledWith({
      where: { id: payload.id },
      relations: {
        item: true,
        user: true,
      },
    });
    expect(response).toEqual(MOCKED_EXPENSES[1]);
  });

  it('should throw a not found error (incorrect id)', async () => {
    const payload = {
      id: 'Incorrect id',
    };

    await expect(resolver.getExpense(payload.id)).rejects.toThrow(Error());

    expect(MOCKED_QUERIES.EXPENSE_ENTITY.findOne).toHaveBeenCalledWith({
      where: { id: payload.id },
      relations: {
        user: true,
        item: true,
      },
    });
  });
});

describe('getAllExpenses', () => {
  it('should return an array of Expenses objects with all expenses available', async () => {
    const response = await resolver.getAllExpenses();

    expect(MOCKED_QUERIES.EXPENSE_ENTITY.find).toHaveBeenCalled();
    expect(response).toEqual(MOCKED_EXPENSES);
  });
});

describe('createExpense', () => {
  it('should call findOneByOrFail method for User, Item repositories and return an Expense object', async () => {
    const { item, title, quantity, user } = MOCKED_EXPENSES[1];
    const emissionTotal = item.emissionFactor * quantity;
    const date = '2024-03-02';

    const createdExpense = await resolver.createExpense(
      item.id,
      title,
      quantity,
      date,
      user.id,
    );
    expect(MOCKED_QUERIES.ITEM_ENTITY.findOneByOrFail).toHaveBeenCalledWith({
      id: item.id,
    });
    expect(MOCKED_QUERIES.USER_ENTITY.findOneByOrFail).toHaveBeenCalledWith({
      id: user.id,
    });
    expect(MOCKED_QUERIES.EXPENSE_ENTITY.save).toHaveBeenCalledWith({
      item,
      user,
      title,
      emissionTotal,
      quantity,
      createdAt: new Date(date),
      id: undefined,
      updatedAt: undefined,
    });
    expect(createdExpense).toEqual('Expense created');
  });
});

describe('updateExpense', () => {
  it('should call findOne and findOneByOrFail methods for Expense, Item, User repositories and return an Expense object', async () => {
    const { id, item, title, quantity, user } = MOCKED_EXPENSES[1];
    const date = '2024-03-02';

    const emissionTotal = item.emissionFactor * quantity;

    const updatedExpense = await resolver.updateExpense(
      id,
      item.id,
      title,
      quantity,
      date,
      user.id,
    );

    expect(MOCKED_QUERIES.EXPENSE_ENTITY.findOne).toHaveBeenCalledWith({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });
    expect(MOCKED_QUERIES.USER_ENTITY.findOneByOrFail).toHaveBeenCalledWith({
      id: user.id,
    });
    expect(MOCKED_QUERIES.ITEM_ENTITY.findOneByOrFail).toHaveBeenCalledWith({
      id: item.id,
    });
    expect(MOCKED_QUERIES.EXPENSE_ENTITY.save).toHaveBeenCalledWith(
      expect.objectContaining({
        item,
        user,
        title,
        emissionTotal,
        quantity,
        updatedAt: new Date(date),
      }),
    );
    expect(updatedExpense).toEqual(MOCKED_EXPENSES[1]);
  });
  it('should throw an Expense not found error (incorrect or missing id)', async () => {
    const { item, title, quantity, user } = MOCKED_EXPENSES[1];
    const expenseId = 'Incorrect id';
    const date = '2024-03-02';

    await expect(
      resolver.updateExpense(
        expenseId,
        item.id,
        title,
        quantity,
        date,
        user.id,
      ),
    ).rejects.toThrow(Error('Expense not found'));

    expect(MOCKED_QUERIES.EXPENSE_ENTITY.findOne).toHaveBeenCalledWith({
      where: {
        id: expenseId,
      },
      relations: {
        user: true,
      },
    });
    expect(MOCKED_QUERIES.USER_ENTITY.findOne).not.toHaveBeenCalled();
    expect(MOCKED_QUERIES.EXPENSE_ENTITY.save).not.toHaveBeenCalled();
  });
  it('should throw an error if the user is not the owner of the expense', async () => {
    const { id, item, title, quantity } = MOCKED_EXPENSES[1];
    const date = '2024-03-02';

    await expect(
      resolver.updateExpense(
        id,
        item.id,
        title,
        quantity,
        date,
        MOCKED_USERS[0].id,
      ),
    ).rejects.toThrow(Error("You're not the owner of this expense"));

    expect(MOCKED_QUERIES.EXPENSE_ENTITY.findOne).toHaveBeenCalledWith({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });
    expect(MOCKED_QUERIES.USER_ENTITY.findOne).not.toHaveBeenCalled();
    expect(MOCKED_QUERIES.EXPENSE_ENTITY.save).not.toHaveBeenCalled();
  });
  it('should throw an Item not found error (incorrect or missing id)', async () => {
    const itemId = 'unknown';
    const { id, title, quantity, user } = MOCKED_EXPENSES[1];
    const date = '2024-03-02';

    await expect(
      resolver.updateExpense(id, itemId, title, quantity, date, user.id),
    ).rejects.toThrow(Error(`Item not found`));

    expect(MOCKED_QUERIES.ITEM_ENTITY.findOneByOrFail).toHaveBeenCalledWith({
      id: itemId,
    });
    expect(MOCKED_QUERIES.EXPENSE_ENTITY.save).not.toHaveBeenCalled();
  });
  it('should throw an error if quantity is not valid', async () => {
    const { id, item, title, user } = MOCKED_EXPENSES[1];
    const date = '2024-03-02';

    await expect(
      resolver.updateExpense(id, item.id, title, -5, date, user.id),
    ).rejects.toThrow(Error(`Quantity value is not valid`));

    expect(MOCKED_QUERIES.EXPENSE_ENTITY.save).not.toHaveBeenCalled();
  });
});

describe('deleteExpense', () => {
  it('should fetch a user and return a confirmation message', async () => {
    const { id } = MOCKED_EXPENSES[1];
    const response = await resolver.deleteExpense(id);

    expect(MOCKED_QUERIES.EXPENSE_ENTITY.findOneByOrFail).toHaveBeenCalledWith({
      id,
    });
    expect(MOCKED_QUERIES.EXPENSE_ENTITY.remove).toHaveBeenCalledWith(
      MOCKED_EXPENSES[1],
    );
    expect(response).toEqual('Expense deleted');
  });

  it('should fail to fetch an expense and throw an error', async () => {
    const id = 'Incorrect id';

    await expect(resolver.deleteExpense(id)).rejects.toThrow(Error);
    expect(MOCKED_QUERIES.EXPENSE_ENTITY.remove).not.toHaveBeenCalled();
  });
});
