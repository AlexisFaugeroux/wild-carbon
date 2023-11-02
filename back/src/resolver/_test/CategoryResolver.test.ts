import CategoryResolver from '../../resolver/CategoryResolver';

const resolver = new CategoryResolver();

const { createCategory, deleteCategory, updateCategory } = resolver;

describe('CategoryResolver', () => {
  describe('Mutation', () => {
    describe('createCategory', () => {
      afterEach(() => {
        jest.clearAllMocks();
      });

      it('should create a category', async () => {
        const expectedResult = {
          id: 'mockedId123',
          name: 'Food',
        };

        const mockDb = {
          getRepository: () => ({
            save: jest.fn().mockReturnValue(expectedResult),
          }),
        };

        const mockContext = {
          dataSource: mockDb,
        };

        const name = 'Food';
        const category = await createCategory(name, mockContext);
        expect(category).toMatchObject(expectedResult);
      });

      it('should not create a category', async () => {
        const mockDb = {
          getRepository: () => ({
            save: jest.fn().mockRejectedValue('promise rejected'),
          }),
        };

        const mockContext = {
          dataSource: mockDb,
        };

        const name = 'Electronics';
        await expect(createCategory(name, mockContext)).rejects.toEqual(
          'promise rejected',
        );
      });
    });

    describe('updateCategory', () => {
      afterEach(() => {
        jest.clearAllMocks();
      });

      it('should update a category', async () => {
        const expectedResult = {
          id: 'mockedId123',
          name: 'Transport',
        };

        const mockDb = {
          getRepository: () => ({
            findOneByOrFail: jest.fn().mockReturnValue({
              id: 'mockedId123',
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
    });

    describe('deleteCategory', () => {
      afterEach(() => {
        jest.clearAllMocks();
      });

      it('should delete a category', async () => {
        const idToDelete = 'mockedId123';
        const mockDb = {
          getRepository: () => ({
            findOneByOrFail: jest.fn().mockReturnValue({
              id: idToDelete,
              name: 'Food',
            }),
            remove: jest.fn().mockResolvedValue(null),
          }),
        };

        const mockContext = {
          dataSource: mockDb,
        };

        expect(await deleteCategory(idToDelete, mockContext)).toEqual(
          'Category deleted',
        );
      });
    });
  });
});
