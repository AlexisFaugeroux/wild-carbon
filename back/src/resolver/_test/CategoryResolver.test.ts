import CategoryResolver from "../../resolver/CategoryResolver";

const resolver = new CategoryResolver();

const { createCategory } = resolver;


describe('CategoryResolver', () => {
    describe('Mutation', () => {
        describe('createCategory', () => {
            it('should create a category', async () => {
                const expectedResult = {
                    id: 'mockedId123',
                    name: 'Electronics',
                }
                const mockDb = {
                    getRepository: () => ({
                        save: jest.fn().mockReturnValue(expectedResult)
                    })
                };
                
                const mockContext = {
                    dataSource: mockDb
                }
                const name = "Electronics";
                const category = await createCategory(name, mockContext);
                expect(category).toMatchObject(expectedResult);
            })
        })
    })
});
