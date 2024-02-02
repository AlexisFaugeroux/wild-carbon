import { faker } from '@faker-js/faker';
import { Category } from '../../entity/Category';
import { Item } from '../../entity/Item';
import { Categories } from '../../enum/categoriesEnum';
import CategoryResolver from '../CategoryResolver';

const resolver = new CategoryResolver();

type TestCategory = Omit<Category, 'items'>;

const MOCKED_ITEMS: Pick<Item, 'id'>[] = [
  {
    id: faker.string.uuid(),
  },
  {
    id: faker.string.uuid(),
  },
  {
    id: faker.string.uuid(),
  },
  {
    id: faker.string.uuid(),
  },
];

const MOCKED_CATEGORIES: (TestCategory & {
  items: Record<string, string>[];
})[] = [
  {
    id: faker.string.uuid(),
    name: Categories.ENERGY,
    items: [MOCKED_ITEMS[0], MOCKED_ITEMS[1]],
  },
  {
    id: faker.string.uuid(),
    name: Categories.FOOD,
    items: [...MOCKED_ITEMS],
  },
  {
    id: faker.string.uuid(),
    name: Categories.HOUSING,
    items: [],
  },
  {
    id: faker.string.uuid(),
    name: Categories.TRANSPORT,
    items: [MOCKED_ITEMS[2]],
  },
];

const MOCKED_QUERIES = {
  CATEGORY_ENTITY: {
    findOne: jest.fn().mockImplementation((input) => {
      const {
        where: { id },
      } = input;
      return new Promise((resolve) => {
        if (!id || id !== MOCKED_CATEGORIES[0].id) {
          resolve(null);
        }
        resolve(MOCKED_CATEGORIES[0]);
      });
    }),
    find: jest.fn().mockResolvedValue(MOCKED_CATEGORIES),
    findOneByOrFail: jest.fn().mockImplementation(({ id }) => {
      return new Promise((resolve, rejects) => {
        if (!id || id !== MOCKED_CATEGORIES[1].id) {
          rejects(new Error());
        }
        resolve(MOCKED_CATEGORIES[1]);
      });
    }),
    save: jest.fn().mockResolvedValue(MOCKED_CATEGORIES[1]),
    remove: jest.fn().mockResolvedValue(MOCKED_CATEGORIES[3]),
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
        getRepository: jest
          .fn()
          .mockImplementation(() => MOCKED_QUERIES.CATEGORY_ENTITY),
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

describe('getCategory', () => {
  it('should return a Category object', async () => {
    const payload = {
      id: MOCKED_CATEGORIES[0].id,
    };
    const response = await resolver.getCategory(payload.id);

    expect(MOCKED_QUERIES.CATEGORY_ENTITY.findOne).toHaveBeenCalledWith({
      where: { id: payload.id },
      relations: {
        items: true,
      },
    });
    expect(response).toEqual(MOCKED_CATEGORIES[0]);
  });
  it('should throw a not found error (incorrect id)', async () => {
    const payload = {
      id: 'Incorrect id',
    };

    await expect(resolver.getCategory(payload.id)).rejects.toThrow(
      Error('Category not found'),
    );

    expect(MOCKED_QUERIES.CATEGORY_ENTITY.findOne).toHaveBeenCalledWith({
      where: { id: payload.id },
      relations: {
        items: true,
      },
    });
  });
});

describe('getAllCategories', () => {
  it('should return an array of Categories objects with all categories available', async () => {
    const response = await resolver.getAllCategory();

    expect(MOCKED_QUERIES.CATEGORY_ENTITY.find).toHaveBeenCalled();
    expect(response).toEqual(MOCKED_CATEGORIES);
  });
});

describe('createCategory', () => {
  it('should call findOne method for User repository and return an Category object', async () => {
    const { name } = MOCKED_CATEGORIES[1];
    const createdCategory = await resolver.createCategory(name);

    expect(MOCKED_QUERIES.CATEGORY_ENTITY.save).toHaveBeenCalledWith({
      name,
      id: undefined,
      items: undefined,
    });
    expect(createdCategory).toEqual(MOCKED_CATEGORIES[1]);
  });
});

describe('updateCategory', () => {
  it('should call findOneByOrFail and save methods for Category entity and return an Category object', async () => {
    const { name, id } = MOCKED_CATEGORIES[1];
    const updatedCategory = await resolver.updateCategory(id, name);

    expect(MOCKED_QUERIES.CATEGORY_ENTITY.findOneByOrFail).toHaveBeenCalledWith(
      { id },
    );
    expect(MOCKED_QUERIES.CATEGORY_ENTITY.save).toHaveBeenCalledWith(
      updatedCategory,
    );
    expect(updatedCategory).toEqual(MOCKED_CATEGORIES[1]);
  });
  it('should throw an Category not found error (incorrect or missing id)', async () => {
    const { name } = MOCKED_CATEGORIES[1];
    const categoryId = 'Incorrect id';

    await expect(resolver.updateCategory(categoryId, name)).rejects.toThrow(
      Error,
    );

    expect(MOCKED_QUERIES.CATEGORY_ENTITY.findOneByOrFail).toHaveBeenCalledWith(
      {
        id: categoryId,
      },
    );
    expect(MOCKED_QUERIES.CATEGORY_ENTITY.save).not.toHaveBeenCalled();
  });
});

describe('deleteCategory', () => {
  it('should fetch a user and return a confirmation message', async () => {
    const { id } = MOCKED_CATEGORIES[1];
    const response = await resolver.deleteCategory(id);

    expect(MOCKED_QUERIES.CATEGORY_ENTITY.findOneByOrFail).toHaveBeenCalledWith(
      {
        id,
      },
    );
    expect(MOCKED_QUERIES.CATEGORY_ENTITY.remove).toHaveBeenCalledWith(
      MOCKED_CATEGORIES[1],
    );
    expect(response).toEqual('Category deleted');
  });

  it('should fail to fetch a user and throw an error', async () => {
    const id = 'Incorrect id';

    await expect(resolver.deleteCategory(id)).rejects.toThrow(Error);
  });

  expect(MOCKED_QUERIES.CATEGORY_ENTITY.remove).not.toHaveBeenCalled();
});
