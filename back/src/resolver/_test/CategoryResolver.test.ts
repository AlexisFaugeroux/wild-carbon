import CategoryResolver from '../../resolver/CategoryResolver';

const resolver = new CategoryResolver();

const { createCategory, deleteCategory, updateCategory, getAllCategory, getCategory } = resolver;

const mockDb = {
    createCategory: jest.fn().mockReturnValue({
        id : 'mockDbID',
        name: 'Electronics'
    }),
    createCategoryEmptyName: jest.fn().mockReturnValue({
        id : '',
        name: ''
    }),
    updateCategory: jest.fn().mockReturnValue({
        id: 'mockDbID',
        name: 'Transport'
    }),
    deleteCategory: jest.fn().mockResolvedValue('Category deleted'),
    getCategory: jest.fn().mockReturnValue({
            id:'mockDbID',
            name: 'Transport'
    })
};

describe('CategoryResolver', () => {
    describe('Mutation', () => {
        describe('createCategory', () => {
            it('should create a category', async () => {
                const mockDb = {
                    createCategory: jest.fn().mockReturnValue({
                        id: 'mockedId123',
                        name: 'Electronics',
                    }),
                };

                const category = await createCategory(
                    null, 
                    { name: 'Electronics' },
                    { db: mockDb }
                );

                await expect(mockDb.createCategory).toHaveBeenCalledWith({name: 'Electronics'});
                await expect(category).toEqual({ id: 'mockedId123', name: 'Electronics' });
            });
            it('should throw an error if name is missing', () => {
                expect(mockDb.createCategoryEmptyName).rejects.toThrow();
            });
        });
    });

    describe('updateCategory', () => {
        it('should update a category', async () => {
            const id = "categoryIdToUpdate";
            const name = "Updated Category";
            const updatedCategory = await updateCategory(id, name);
            expect(updatedCategory.name).toBe(name);
        });

        it('should throw an error if category does not exist', async () => {
            const id = "nonExistentCategoryId";
            const name = "Updated Category";
            await expect(updateCategory(id, name)).rejects.toThrow();
        });
    });

    describe('deleteCategory', () => {
        it('should delete a category', async () => {
            const id = "categoryIdToDelete";
            const result = await deleteCategory(id);
            expect(result).toBe('Category deleted');
        });

        it('should throw an error if category does not exist', async () => {
            const id = "nonExistentCategoryId";
            await expect(deleteCategory(id)).rejects.toThrow();
        });
    });

    describe('getCategory', () => {
        it('should return a category', async () => {
            const id = "categoryIdToGet";
            const category = await getCategory(id);
            expect(category).toBeDefined();
        });

        it('should throw an error if category does not exist', async () => {
            const id = "nonExistentCategoryId";
            await expect(getCategory(id)).rejects.toThrow();
        });
    });

    describe('getAllCategory', () => {
        it('should return an array of categories', async () => {
            const categories = await getAllCategory();
            expect(Array.isArray(categories)).toBe(true);
        });
    });

    
});
