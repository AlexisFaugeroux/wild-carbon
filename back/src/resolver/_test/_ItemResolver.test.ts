import { faker } from '@faker-js/faker';
import { Category } from '../../entity/Category';
import { Item } from '../../entity/Item';
import { Categories } from '../../enum/categoriesEnum';
import UnitEnum from '../../enum/unitEnum';
import ItemResolver from '../ItemResolver';

const resolver = new ItemResolver();

type TestItem = Omit<Item, 'category' | 'expenses' | 'updatedAt'>;

const MOCKED_CATEGORIES = [
  {
    id: faker.string.uuid(),
    name: Categories.ENERGY,
  },
  {
    id: faker.string.uuid(),
    name: Categories.FOOD,
  },
  {
    id: faker.string.uuid(),
    name: Categories.HOUSING,
  },
  {
    id: faker.string.uuid(),
    name: Categories.TRANSPORT,
  },
];

const MOCKED_EXPENSES = [
  {
    id: faker.string.uuid(),
    emissionTotal: faker.number.float({ precision: 2 }),
    title: faker.lorem.words({ min: 1, max: 5 }),
    quantity: faker.number.float({ precision: 2 }),
    createdAt: faker.date.past(),
  },
  {
    id: faker.string.uuid(),
    emissionTotal: faker.number.float({ precision: 2 }),
    title: faker.lorem.words({ min: 1, max: 5 }),
    quantity: faker.number.float({ precision: 2 }),
    createdAt: faker.date.past(),
  },
  {
    id: faker.string.uuid(),
    emissionTotal: faker.number.float({ precision: 2 }),
    title: faker.lorem.words({ min: 1, max: 5 }),
    quantity: faker.number.float({ precision: 2 }),
    createdAt: faker.date.past(),
  },
];

const MOCKED_ITEMS: (TestItem & {
  category: (typeof MOCKED_CATEGORIES)[number];
  expenses: (typeof MOCKED_EXPENSES)[number];
})[] = [
  {
    id: faker.string.uuid(),
    label: faker.word.noun(),
    emissionFactor: faker.number.float({ precision: 0.01 }),
    unit: UnitEnum.KW,
    createdAt: faker.date.past(),
    category: MOCKED_CATEGORIES[0],
    expenses: MOCKED_EXPENSES[0],
  },
  {
    id: faker.string.uuid(),
    label: faker.word.noun(),
    emissionFactor: faker.number.float({ precision: 0.01 }),
    unit: UnitEnum.KG,
    createdAt: faker.date.past(),
    category: MOCKED_CATEGORIES[1],
    expenses: MOCKED_EXPENSES[1],
  },
  {
    id: faker.string.uuid(),
    label: faker.word.noun(),
    emissionFactor: faker.number.float({ precision: 0.01 }),
    unit: UnitEnum.KW,
    createdAt: faker.date.past(),
    category: MOCKED_CATEGORIES[2],
    expenses: MOCKED_EXPENSES[2],
  },
];

const MOCKED_QUERIES = {
  ITEM_ENTITY: {
    findOne: jest.fn().mockImplementation((input) => {
      const {
        where: { id },
      } = input;
      return new Promise((resolve) => {
        if (!id || id !== MOCKED_ITEMS[1].id) {
          resolve(null);
        }
        resolve(MOCKED_ITEMS[1]);
      });
    }),
    find: jest.fn().mockImplementation((input) => {
      return new Promise((resolve) => {
        if (!input.where?.category) {
          resolve(MOCKED_ITEMS);
          return;
        }
        const {
          where: {
            category: { id },
          },
        } = input;
        resolve(MOCKED_ITEMS.filter((item) => item.category.id === id));
        return;
      });
    }),
    findOneByOrFail: jest.fn().mockImplementation(({ id }) => {
      return new Promise((resolve, rejects) => {
        if (!id || id !== MOCKED_ITEMS[0].id) {
          rejects(new Error());
        }
        resolve(MOCKED_ITEMS[0]);
      });
    }),
    save: jest.fn().mockResolvedValue(MOCKED_ITEMS[1]),
    remove: jest.fn().mockResolvedValue(MOCKED_ITEMS[0]),
  },
  CATEGORY_ENTITY: {
    findOneByOrFail: jest.fn().mockImplementation(({ id }) => {
      return new Promise((resolve, rejects) => {
        if (!id || id !== MOCKED_CATEGORIES[1].id) {
          rejects(new Error('Category not found'));
        }
        resolve(MOCKED_CATEGORIES[1]);
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
          if (entity === Item) {
            return MOCKED_QUERIES.ITEM_ENTITY;
          } else if (entity === Category) {
            return MOCKED_QUERIES.CATEGORY_ENTITY;
          }
          // } else if (entity === Item) {
          //   return MOCKED_QUERIES.ITEM_ENTITY;
          // }
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

describe('getItem', () => {
  it('should return an Item object', async () => {
    const payload = {
      id: MOCKED_ITEMS[1].id,
    };
    const response = await resolver.getItem(payload.id);

    expect(MOCKED_QUERIES.ITEM_ENTITY.findOne).toHaveBeenCalledWith({
      where: { id: payload.id },
      relations: {
        category: true,
        expenses: true,
      },
    });
    expect(response).toEqual(MOCKED_ITEMS[1]);
  });

  it('should throw a not found error (incorrect id)', async () => {
    const payload = {
      id: 'Incorrect id',
    };

    await expect(resolver.getItem(payload.id)).rejects.toThrow(
      Error('Item not found'),
    );

    expect(MOCKED_QUERIES.ITEM_ENTITY.findOne).toHaveBeenCalledWith({
      where: { id: payload.id },
      relations: {
        category: true,
        expenses: true,
      },
    });
  });
});

describe('getAllItems', () => {
  it('should return an array of Items objects with all items available', async () => {
    const response = await resolver.getAllItems();

    expect(MOCKED_QUERIES.ITEM_ENTITY.find).toHaveBeenCalled();
    expect(response).toEqual(MOCKED_ITEMS);
  });
});

describe('createItem', () => {
  it('should call findOneByOrFail method and return an Item object', async () => {
    const { label, emissionFactor, unit, category } = MOCKED_ITEMS[1];

    const createdItem = await resolver.createItem(
      label,
      emissionFactor,
      unit,
      category.id,
    );
    expect(MOCKED_QUERIES.ITEM_ENTITY.save).toHaveBeenCalledWith({
      label,
      emissionFactor,
      unit,
      createdAt: new Date(),
      category,
      id: undefined,
      expenses: undefined,
      updatedAt: undefined,
    });
    expect(createdItem).toEqual(MOCKED_ITEMS[1]);
  });

  it('should console log and throw an Error because user is not found', async () => {
    const categoryId = 'Incorrect id';
    const { label, emissionFactor, unit } = MOCKED_ITEMS[1];

    await expect(
      resolver.createItem(label, emissionFactor, unit, categoryId),
    ).rejects.toThrow(Error('Category not found'));

    expect(MOCKED_QUERIES.CATEGORY_ENTITY.findOneByOrFail).toHaveBeenCalledWith(
      {
        id: categoryId,
      },
    );
  });
});

describe('updateItem', () => {
  it('should call findOne methods for Item repository and return an Item object', async () => {
    const { id, label, emissionFactor, unit, createdAt, category } =
      MOCKED_ITEMS[1];
    const updatedItem = await resolver.updateItem(
      id,
      label,
      emissionFactor,
      unit,
      category.id,
    );

    expect(MOCKED_QUERIES.ITEM_ENTITY.findOne).toHaveBeenCalledWith({
      where: { id },
    });
    expect(MOCKED_QUERIES.ITEM_ENTITY.save).toHaveBeenCalledWith(
      expect.objectContaining({
        id,
        label,
        emissionFactor,
        unit,
        createdAt,
      }),
    );
    expect(updatedItem).toEqual(MOCKED_ITEMS[1]);
  });
  it('should throw an Item not found error (incorrect or missing id)', async () => {
    const { label, emissionFactor, unit, category } = MOCKED_ITEMS[1];
    const itemId = 'Incorrect id';

    await expect(
      resolver.updateItem(itemId, label, emissionFactor, unit, category.id),
    ).rejects.toThrow(Error('Item not found'));

    expect(MOCKED_QUERIES.ITEM_ENTITY.findOne).toHaveBeenCalledWith({
      where: {
        id: itemId,
      },
    });
    expect(MOCKED_QUERIES.ITEM_ENTITY.save).not.toHaveBeenCalled();
  });
});

describe('deleteItem', () => {
  it('should fetch a user and return a confirmation message', async () => {
    const { id } = MOCKED_ITEMS[0];
    const response = await resolver.deleteItem(id);

    expect(MOCKED_QUERIES.ITEM_ENTITY.findOneByOrFail).toHaveBeenCalledWith({
      id,
    });
    expect(MOCKED_QUERIES.ITEM_ENTITY.remove).toHaveBeenCalledWith(
      MOCKED_ITEMS[0],
    );
    expect(response).toEqual('Item deleted');
  });

  it('should fail to fetch an item and throw an error', async () => {
    const id = 'Incorrect id';

    await expect(resolver.deleteItem(id)).rejects.toThrow(Error);
    expect(MOCKED_QUERIES.ITEM_ENTITY.remove).not.toHaveBeenCalled();
  });
});

describe('getItemByIdCategory', () => {
  it('should get all items related to a category', async () => {
    const { id } = MOCKED_CATEGORIES[0];

    const items = await resolver.getItemByIdCategory(id);

    expect(MOCKED_QUERIES.ITEM_ENTITY.find).toHaveBeenCalledWith({
      where: {
        category: {
          id,
        },
      },
    });
    expect(items).toEqual([MOCKED_ITEMS[0]]);
  });
});
