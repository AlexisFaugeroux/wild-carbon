import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import { Category } from '../entity/Category';
import { EntityNotFoundError } from 'typeorm';
import dataSource from '../utils';

@Resolver()
class CategoryResolver {
  @Mutation(() => Category)
  async createCategory(@Arg('name') name: string): Promise<Category> {
    try {
      const category = new Category();
      category.name = name;
      const createdCategory = await dataSource
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
  ): Promise<Category> {
    try {
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
  async deleteCategory(@Arg('categoryId') id: string): Promise<string> {
    const targetedCategory = await dataSource
      .getRepository(Category)
      .findOneByOrFail({ id });

    await dataSource.getRepository(Category).remove(targetedCategory);
    return 'Category deleted';
  }

  @Query(() => Category)
  async getCategory(@Arg('categoryId') id: string): Promise<Category> {
    const category = await dataSource
      .getRepository(Category)
      .findOneByOrFail({ id });

    return category;
  }

  @Query(() => [Category])
  async getAllCategory(): Promise<Category[]> {
    try {
      const categories = await dataSource.getRepository(Category).find();
      return categories;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default CategoryResolver;
