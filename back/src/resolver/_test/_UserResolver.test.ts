import { faker } from '@faker-js/faker';
import * as argon2 from 'argon2';
import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { Article } from '../../entity/Article';
import { User } from '../../entity/User';
import UserResolver from '../UserResolver';

dotenv.config();

const resolver = new UserResolver();

type TestUser = Omit<User, 'articles' | 'users' | 'expenses'>;

const MOCKED_EXPENSES = [
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

const MOCKED_FRIENDS = [
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

const MOCKED_ARTICLES = [
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

const MOCKED_USERS: (TestUser & {
  users: (typeof MOCKED_FRIENDS)[number][];
  expenses: (typeof MOCKED_EXPENSES)[number];
  articles: (typeof MOCKED_ARTICLES)[number];
})[] = [
  {
    id: faker.string.uuid(),
    pseudo: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    users: [MOCKED_FRIENDS[0], MOCKED_FRIENDS[1]],
    expenses: MOCKED_EXPENSES[0],
    articles: MOCKED_ARTICLES[0],
  },
  {
    id: faker.string.uuid(),
    pseudo: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    users: [MOCKED_FRIENDS[0], MOCKED_FRIENDS[2]],
    expenses: MOCKED_EXPENSES[1],
    articles: MOCKED_ARTICLES[1],
  },
  {
    id: faker.string.uuid(),
    pseudo: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    users: [],
    expenses: MOCKED_EXPENSES[2],
    articles: MOCKED_ARTICLES[2],
  },
];

const MOCKED_QUERIES = {
  USER_ENTITY: {
    findOne: jest.fn().mockImplementation((input) => {
      const {
        where: { id },
      } = input;
      return new Promise((resolve) => {
        if (!id || id !== MOCKED_USERS[0].id) {
          resolve(null);
        }
        resolve(MOCKED_USERS[0]);
      });
    }),
    find: jest.fn().mockResolvedValue(MOCKED_USERS),
    findOneBy: jest.fn().mockImplementation(async (input) => {
      const { email } = input;
      const hashedPassword = await argon2.hash(MOCKED_USERS[1].password);
      return new Promise((resolve) => {
        if (!email || email !== MOCKED_USERS[1].email) {
          resolve(null);
        }
        resolve({ ...MOCKED_USERS[1], password: hashedPassword });
      });
    }),
    findOneByOrFail: jest.fn().mockImplementation(({ id }) => {
      return new Promise((resolve, rejects) => {
        if (!id || id !== MOCKED_USERS[0].id) {
          rejects(new Error());
        }
        resolve(MOCKED_USERS[0]);
      });
    }),
    save: jest.fn().mockResolvedValue(MOCKED_USERS[0]),
    remove: jest.fn().mockResolvedValue(MOCKED_USERS[2]),
  },
  ARTICLE_ENTITY: {
    findOne: jest.fn().mockImplementation((input) => {
      const {
        where: { id },
      } = input;
      if (!id || id !== MOCKED_ARTICLES[0].id) {
        return null;
      }
      return MOCKED_ARTICLES[0].id;
    }),
  },
  EXPENSE_ENTITY: {
    findOne: jest.fn().mockImplementation((input) => {
      const {
        where: { id },
      } = input;
      if (!id || id !== MOCKED_EXPENSES[0].id) {
        return null;
      }
      return MOCKED_EXPENSES[0].id;
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
          if (entity === Article) {
            return MOCKED_QUERIES.ARTICLE_ENTITY;
          } else if (entity === User) {
            return MOCKED_QUERIES.USER_ENTITY;
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

describe('getUser', () => {
  it('should return an User object', async () => {
    const payload = {
      id: MOCKED_USERS[0].id,
    };
    const response = await resolver.userData(payload.id);

    expect(MOCKED_QUERIES.USER_ENTITY.findOne).toHaveBeenCalledWith({
      where: { id: payload.id },
      relations: {
        articles: true,
        expenses: {
          item: true,
        },
        users: true,
      },
    });
    expect(response).toEqual(MOCKED_USERS[0]);
  });

  it('should throw a not found error (incorrect id)', async () => {
    const payload = {
      id: 'Incorrect id',
    };

    await expect(resolver.userData(payload.id)).rejects.toThrow(
      Error('User not found'),
    );

    expect(MOCKED_QUERIES.USER_ENTITY.findOne).toHaveBeenCalledWith({
      where: { id: payload.id },
      relations: {
        articles: true,
        expenses: {
          item: true,
        },
        users: true,
      },
    });
  });

  it('should throw a not found error (missing id)', async () => {
    const payload = {
      id: '',
    };

    await expect(resolver.userData(payload.id)).rejects.toThrow(
      Error('User not found'),
    );
    expect(MOCKED_QUERIES.USER_ENTITY.findOne).toHaveBeenCalledWith({
      where: { id: payload.id },
      relations: {
        articles: true,
        expenses: {
          item: true,
        },
        users: true,
      },
    });
  });
});

describe('getAllUsers', () => {
  it('should return an array of Article objects with all articles available', async () => {
    const response = await resolver.getAllUsers();

    expect(MOCKED_QUERIES.USER_ENTITY.find).toHaveBeenCalledWith({
      relations: {
        articles: true,
        expenses: {
          item: true,
        },
        users: true,
      },
    });
    expect(response).toEqual(MOCKED_USERS);
  });
});

describe('createUser', () => {
  it('should call findOne method for User repository and return an User object', async () => {
    const { pseudo, email, password } = MOCKED_USERS[0];
    const createdUser = await resolver.createUser(pseudo, email, password);

    expect(MOCKED_QUERIES.USER_ENTITY.save).toHaveBeenCalledWith(
      expect.objectContaining({
        pseudo,
        email,
      }),
    );
    expect(createdUser).toEqual(MOCKED_USERS[0]);
  });
});

describe('updateUser', () => {
  it('should call findOneByOrFail method for User repository and return an User object', async () => {
    const { id, pseudo, email, password } = MOCKED_USERS[0];
    const updatedUser = await resolver.updateUser(id, pseudo, email, password);

    expect(MOCKED_QUERIES.USER_ENTITY.findOneByOrFail).toHaveBeenCalledWith({
      id,
    });

    expect(MOCKED_QUERIES.USER_ENTITY.save).toHaveBeenCalledWith(
      MOCKED_USERS[0],
    );
    expect(updatedUser).toEqual(MOCKED_USERS[0]);
  });
  it('should throw an User not found error (incorrect or missing id)', async () => {
    const { id, pseudo, email, password } = MOCKED_USERS[1];

    await expect(
      resolver.updateUser(id, pseudo, email, password),
    ).rejects.toThrow(Error());

    expect(MOCKED_QUERIES.USER_ENTITY.findOneByOrFail).toHaveBeenCalledWith({
      id,
    });
    expect(MOCKED_QUERIES.USER_ENTITY.save).not.toHaveBeenCalled();
  });
});

describe('deleteUser', () => {
  it('should fetch a user and return a confirmation message', async () => {
    const { id } = MOCKED_USERS[0];
    const response = await resolver.deleteUser(id);

    expect(MOCKED_QUERIES.USER_ENTITY.findOneByOrFail).toHaveBeenCalledWith({
      id,
    });
    expect(MOCKED_QUERIES.USER_ENTITY.remove).toHaveBeenCalledWith(
      MOCKED_USERS[0],
    );
    expect(response).toEqual('User deleted');
  });

  it('should fail to fetch a user and throw an error', async () => {
    const id = 'Incorrect id';

    await expect(resolver.deleteUser(id)).rejects.toThrow(Error);
    expect(MOCKED_QUERIES.USER_ENTITY.remove).not.toHaveBeenCalled();
  });
});

describe('login', () => {
  it('should call findOneBy method for User repository and return a LoginResponse object', async () => {
    const { id, pseudo, email, password } = MOCKED_USERS[1];
    const response = await resolver.login(email, password);

    const jwtKey = process.env.JWT_KEY as string;
    const token = jwt.sign({ id, pseudo, email }, jwtKey, { expiresIn: '24h' });

    expect(MOCKED_QUERIES.USER_ENTITY.findOneBy).toHaveBeenCalledWith({
      email,
    });

    expect(response).toEqual({
      user: { id, pseudo, email },
      token,
      success: true,
    });
  });
  it('should return an empty LoginResponse and console.log error message', async () => {
    const { password } = MOCKED_USERS[1];
    const invalidEmail = 'invalid';

    const response = await resolver.login(invalidEmail, password);

    expect(MOCKED_QUERIES.USER_ENTITY.findOneBy).toHaveBeenCalledWith({
      email: invalidEmail,
    });

    expect(response).toEqual({
      user: null,
      token: '',
      success: false,
    });
  });
});
