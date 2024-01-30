import { Query, Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { Category } from '../entity/Category';
import { EntityNotFoundError } from 'typeorm';
import dataSource from '../utils';

@Resolver()
class CategoryResolver {
  @Mutation(() => Category)
  async createCategory(
    @Arg('name') name: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Ctx() context: any,
  ): Promise<Category> {
    try {
      const source = context.dataSource ?? dataSource;
      const category = new Category();
      category.name = name;
      const createdCategory = await source
        .getRepository(Category)
        .save(category);
      return createdCategory;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Mutation(() => Category)
  async updateCategory(
    @Arg('categoryId') id: string,
    @Arg('name') name: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Ctx() context: any,
  ): Promise<Category> {
    try {
      const { dataSource } = context;
      const targetedCategory = await dataSource
        .getRepository(Category)
        .findOneByOrFail({ id });

      targetedCategory.name = name;

      const updateCategory = await dataSource
        .getRepository(Category)
        .save(targetedCategory);

      return updateCategory;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        console.error('Category not found');
      } else {
        console.error(error);
      }
      throw error;
    }
  }

  @Mutation(() => String)
  async deleteCategory(
    @Arg('categoryId') id: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Ctx() context: any,
  ): Promise<string> {
    const { dataSource } = context;
    const targetedCategory = await dataSource
      .getRepository(Category)
      .findOneByOrFail({ id });

    await dataSource.getRepository(Category).remove(targetedCategory);
    return 'Category deleted';
  }

  @Query(() => Category)
  async getCategory(
    @Arg('categoryId') id: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Ctx() context: any,
  ): Promise<Category> {
    const source = context.dataSource ?? dataSource;
    try {
      const category = await source.getRepository(Category).findOne({
        where: { id },
        relations: {
          items: true,
        },
      });

      if (!category) throw new Error('Category not found');

      return category;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Query(() => [Category])
  async getAllCategory(): Promise<Category[]> {
    try {
      const categories = await dataSource.getRepository(Category).find({
        relations: {
          items: true,
        },
      });

      return categories;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default CategoryResolver;
