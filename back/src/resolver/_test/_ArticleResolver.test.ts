import { faker } from '@faker-js/faker';
import { Article } from '../../entity/Article';
import { User } from '../../entity/User';
import ArticleResolver from '../ArticleResolver';

// Tests unitaires pour les resolvers Article

const resolver = new ArticleResolver();

// Typage custom : on ne prend pas updatedAt car c'est géré par la BDD
// et on ne prend pas user pour pouvoir le typer nous-même plus simplement, ça nous évite de mocker un user complet
type TestArticle = Omit<Article, 'user' | 'updatedAt'>;

// On mock 2 users, représentés juste par un id
const MOCKED_USERS: Pick<User, 'id'>[] = [
  {
    id: faker.string.uuid(),
  },
  {
    id: faker.string.uuid(),
  },
];

// On mock 3 articles
const MOCKED_ARTICLES: (TestArticle & {
  user: {
    id: string;
  };
})[] = [
  {
    id: faker.string.uuid(),
    title: faker.lorem.words({ min: 1, max: 10 }),
    description: faker.lorem.sentences(3),
    url: faker.internet.url(),
    user: MOCKED_USERS[0],
    createdAt: faker.date.past(),
  },
  {
    id: faker.string.uuid(),
    title: faker.lorem.words({ min: 1, max: 10 }),
    description: faker.lorem.sentences(3),
    url: faker.internet.url(),
    user: MOCKED_USERS[0],
    createdAt: faker.date.past(),
  },
  {
    id: faker.string.uuid(),
    title: faker.lorem.words({ min: 1, max: 10 }),
    description: faker.lorem.sentences(3),
    url: faker.internet.url(),
    user: MOCKED_USERS[1],
    createdAt: faker.date.past(),
  },
];

// Le but c'est de faire des tests unitaires, on ne veut pas réellement chercher les données en base
// Donc on va vouloir mocker les requêtes vers la BDD et les réponses
// Pour faire ça :
// 1- il faut mocker l'objet Datasource de typeorm et sa méthode getRepository (ligne 103 à 126)
// 2- il faut mocker les méthodes de CRUD liées à chaque repository ("entité" chez nous) (ligne 62 à 100)

const MOCKED_QUERIES = {
  // Mock des méthodes de CRUD pour l'entité Article
  ARTICLE_ENTITY: {
    findOne: jest.fn().mockImplementation((input) => {
      const {
        where: { id },
      } = input;
      return new Promise((resolve) => {
        if (!id || id !== MOCKED_ARTICLES[0].id) {
          resolve(null);
        }
        resolve(MOCKED_ARTICLES[0]);
      });
    }),
    find: jest.fn().mockResolvedValue(MOCKED_ARTICLES),
    findOneByOrFail: jest.fn().mockImplementation(({ id }) => {
      return new Promise((resolve, rejects) => {
        if (!id || id !== MOCKED_ARTICLES[2].id) {
          rejects(new Error());
        }
        resolve(MOCKED_ARTICLES[2]);
      });
    }),
    save: jest.fn().mockResolvedValue(MOCKED_ARTICLES[0]),
    remove: jest.fn().mockResolvedValue(MOCKED_ARTICLES[2]),
  },
  // Mock des méthodes de CRUD pour l'entité User
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
  },
};

// Mock de Datasource et getRepository du module typeorm
jest.mock('typeorm', () => {
  // on récupère tous les modules de typeorm...
  const actual = jest.requireActual('typeorm');
  return {
    // ... et on les spread (on ne veut mocker que Datasource)
    ...actual,
    // on surchage Datasource pour le mocker
    DataSource: jest.fn().mockImplementation(() => {
      const { datasource } = actual;
      return {
        // idem on spread le contenu normal de Datasource
        ...datasource,
        // mais on surcharge getRepository pour le mocker
        getRepository: jest.fn().mockImplementation((repoClass) => {
          if (repoClass === Article) {
            return MOCKED_QUERIES.ARTICLE_ENTITY;
          } else if (repoClass === User) {
            return MOCKED_QUERIES.USER_ENTITY;
          }
        }),
      };
    }),
  };
});
// Maintenant dès qu'un resolver appelera datasource.getRepository().find()/save()/ ...etc
// nos fonctions mockées seront jouées à la place des fonctions originelles

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('getArticle', () => {
  it('should return an Article object', async () => {
    const payload = {
      id: MOCKED_ARTICLES[0].id,
    };
    const response = await resolver.getArticle(payload.id);

    expect(MOCKED_QUERIES.ARTICLE_ENTITY.findOne).toHaveBeenCalledWith({
      where: { id: payload.id },
      relations: {
        user: true,
      },
    });
    expect(response).toEqual(MOCKED_ARTICLES[0]);
  });

  it('should throw a not found error (incorrect id)', async () => {
    const payload = {
      id: 'Incorrect id',
    };

    await expect(resolver.getArticle(payload.id)).rejects.toThrow(
      Error('Article not found'),
    );

    expect(MOCKED_QUERIES.ARTICLE_ENTITY.findOne).toHaveBeenCalledWith({
      where: { id: payload.id },
      relations: {
        user: true,
      },
    });
  });

  it('should throw a not found error (missing id)', async () => {
    const payload = {
      id: '',
    };

    await expect(resolver.getArticle(payload.id)).rejects.toThrow(
      Error('Article not found'),
    );
    expect(MOCKED_QUERIES.ARTICLE_ENTITY.findOne).toHaveBeenCalledWith({
      where: { id: payload.id },
      relations: {
        user: true,
      },
    });
  });
});

describe('getAllArticles', () => {
  it('should return an array of Article objects with all articles available', async () => {
    const response = await resolver.getAllArticle();

    expect(MOCKED_QUERIES.ARTICLE_ENTITY.find).toHaveBeenCalled();
    expect(response).toEqual(MOCKED_ARTICLES);
  });
});

describe('createArticle', () => {
  it('should call findOne method for User repository and return an Article object', async () => {
    const data = MOCKED_ARTICLES[0];
    const createdArticle = await resolver.createArticle(
      data.title,
      data.description,
      data.url,
      MOCKED_USERS[0].id,
    );

    expect(MOCKED_QUERIES.USER_ENTITY.findOne).toHaveBeenCalledWith({
      where: {
        id: MOCKED_USERS[0].id,
      },
    });
    // toHaveBeenCalledWith(expect.objectContaining({})) permet de vérifier
    // que certaines propriétés sont présentes parmi celles réellement passées à la fonction
    // A cause de problèmes de synchro des timestamp, ici on ne vérifie pas que updatedAt
    // est passée à la fonction, alors que si en réalité
    expect(MOCKED_QUERIES.ARTICLE_ENTITY.save).toHaveBeenCalledWith(
      expect.objectContaining({
        title: data.title,
        description: data.description,
        url: data.url,
        user: MOCKED_USERS[0].id,
      }),
    );
    expect(createdArticle).toEqual(data);
  });

  it('should console log and throw an Error because user is not found', async () => {
    const userId = 'Incorrect id';
    const data = MOCKED_ARTICLES[1];

    await expect(
      resolver.createArticle(data.title, data.description, data.url, userId),
    ).rejects.toThrow(Error(`User with ID ${userId} not found`));

    expect(MOCKED_QUERIES.USER_ENTITY.findOne).toHaveBeenCalledWith({
      where: {
        id: userId,
      },
    });
    expect(MOCKED_QUERIES.ARTICLE_ENTITY.save).not.toHaveBeenCalled();
  });
});

describe('updateArticle', () => {
  it('should call findOne methods for Article and User repositories and return an Article object', async () => {
    const { title, description, url, id, createdAt, user } = MOCKED_ARTICLES[0];
    const updatedArticle = await resolver.updateArticle(
      title,
      description,
      url,
      id,
      user.id,
    );

    expect(MOCKED_QUERIES.ARTICLE_ENTITY.findOne).toHaveBeenCalledWith({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });
    expect(MOCKED_QUERIES.USER_ENTITY.findOne).toHaveBeenCalledWith({
      where: {
        id: user.id,
      },
    });
    expect(MOCKED_QUERIES.ARTICLE_ENTITY.save).toHaveBeenCalledWith(
      expect.objectContaining({
        id,
        title,
        description,
        url,
        user,
        createdAt,
      }),
    );
    expect(updatedArticle).toEqual(updatedArticle);
  });
  it('should throw an Article not found error (incorrect or missing id)', async () => {
    const { title, description, url, user } = MOCKED_ARTICLES[1];
    const articleId = 'Incorrect id';

    await expect(
      resolver.updateArticle(title, description, url, articleId, user.id),
    ).rejects.toThrow(Error('Article not found'));

    expect(MOCKED_QUERIES.ARTICLE_ENTITY.findOne).toHaveBeenCalledWith({
      where: {
        id: articleId,
      },
      relations: {
        user: true,
      },
    });
    expect(MOCKED_QUERIES.USER_ENTITY.findOne).not.toHaveBeenCalled();
    expect(MOCKED_QUERIES.ARTICLE_ENTITY.save).not.toHaveBeenCalled();
  });
  it('should throw an User not found error (incorrect or missing id)', async () => {
    const userId = 'unknown';
    const { title, description, url, id } = MOCKED_ARTICLES[0];

    await expect(
      resolver.updateArticle(title, description, url, id, userId),
    ).rejects.toThrow(Error(`User with ID ${userId} not found`));

    expect(MOCKED_QUERIES.USER_ENTITY.findOne).toHaveBeenCalledWith({
      where: {
        id: userId,
      },
    });
    expect(MOCKED_QUERIES.ARTICLE_ENTITY.save).not.toHaveBeenCalled();
  });
});

describe('deleteArticle', () => {
  it('should fetch a user and return a confirmation message', async () => {
    const { id } = MOCKED_ARTICLES[2];
    const response = await resolver.deleteArticle(id);

    expect(MOCKED_QUERIES.ARTICLE_ENTITY.findOneByOrFail).toHaveBeenCalledWith({
      id,
    });
    expect(MOCKED_QUERIES.ARTICLE_ENTITY.remove).toHaveBeenCalledWith(
      MOCKED_ARTICLES[2],
    );
    expect(response).toEqual('Article deleted');
  });

  it('should fail to fetch a user and throw an error', async () => {
    const id = 'Incorrect id';

    await expect(resolver.deleteArticle(id)).rejects.toThrow(Error);
    expect(MOCKED_QUERIES.ARTICLE_ENTITY.remove).not.toHaveBeenCalled();
  });
});
