import CategoryResolver from '../../resolver/CategoryResolver';

const resolver = new CategoryResolver();

const { createCategory, deleteCategory, getCategory, updateCategory } =
  resolver;

describe('CategoryResolver', () => {
  describe('Mutation', () => {
    describe('createCategory', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should create a category', async () => {
        const expectedResult = {
          id: 'mockedId123',
          name: 'Electronics',
        };
        const mockDb = {
          getRepository: () => ({
            save: jest.fn().mockReturnValue(expectedResult),
          }),
        };

        const mockContext = {
          dataSource: mockDb,
        };
        const name = 'Electronics';
        const category = await createCategory(name, mockContext);
        expect(category).toMatchObject(expectedResult);
      });

      it('should not create a category', async () => {
        const errorMessage = 'Failure on createCategory';
        const mockDb = {
          getRepository: () => ({
            save: jest.fn().mockRejectedValue(errorMessage),
          }),
        };

        const mockContext = {
          dataSource: mockDb,
        };

        const name = 'Electronics';
        expect(createCategory(name, mockContext)).rejects.toEqual(errorMessage);
      });
    });

    describe('getCategory', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should return a category', async () => {
        const payload = {
          id: 'mockedId123',
        };

        const expectedResult = {
          id: 'mockedId123',
          name: 'Food',
          items: [],
        };

        const mockDb = {
          getRepository: () => ({
            findOne: jest.fn().mockResolvedValue(expectedResult),
          }),
        };

        const mockContext = {
          dataSource: mockDb,
        };

        expect(await getCategory(payload.id, mockContext)).toEqual(
          expectedResult,
        );
      });
    });

    describe('updateCategory', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should update a category', async () => {
        const expectedResult = {
          id: 'mockedId123',
          name: 'Electronics',
        };
        const mockDb = {
          getRepository: () => ({
            findOneByOrFail: jest.fn().mockReturnValue({
              id: expectedResult.id,
              name: 'Food',
            }),
            save: jest.fn().mockReturnValue(expectedResult),
          }),
        };

        const mockContext = {
          dataSource: mockDb,
        };

        const category = await updateCategory(
          expectedResult.id,
          expectedResult.name,
          mockContext,
        );

        expect(category).toMatchObject(expectedResult);
      });

      it('should not update a category', async () => {
        const payload = {
          id: 'mockedId123',
          name: 'Electronics',
        };
        const errorMessage = 'Failure on updateCategory';
        const mockDb = {
          getRepository: () => ({
            findOneByOrFail: jest.fn().mockRejectedValue(errorMessage),
            save: jest.fn().mockRejectedValue(errorMessage),
          }),
        };

        const mockContext = {
          dataSource: mockDb,
        };

        expect(
          updateCategory(payload.id, payload.name, mockContext),
        ).rejects.toEqual(errorMessage);
      });
    });

    describe('deleteCategory', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should delete a category', async () => {
        const payload = {
          id: 'mockedId123',
        };
        const mockDb = {
          getRepository: () => ({
            findOneByOrFail: jest.fn().mockReturnValue({
              id: payload.id,
              name: 'Food',
            }),
            remove: jest.fn().mockResolvedValue(null),
          }),
        };

        const mockContext = {
          dataSource: mockDb,
        };

        expect(await deleteCategory(payload.id, mockContext)).toEqual(
          'Category deleted',
        );
      });
    });
  });
});
