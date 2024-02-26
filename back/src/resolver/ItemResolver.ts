import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { EntityNotFoundError } from 'typeorm';
import { Category } from '../entity/Category';
import { Item } from '../entity/Item';
import UnitEnum from '../enum/unitEnum';
import dataSource from '../utils';

@Resolver()
class ItemResolver {
  @Mutation(() => Item)
  async createItem(
    @Arg('label') label: string,
    @Arg('emissionFactor') emissionFactor: number,
    @Arg('unit') unit: UnitEnum,
    @Arg('categoryId') categoryId: string,
  ): Promise<Item> {
    try {
      if (!label || !emissionFactor || !unit || !categoryId) {
        throw new Error('One of the fields is missing');
      }

      const category = await dataSource
        .getRepository(Category)
        .findOneByOrFail({ id: categoryId });

      if (!category) throw new Error('Category not found');

      const item = new Item();
      item.label = label;
      item.emissionFactor = emissionFactor;
      item.unit = unit;
      item.createdAt = new Date();
      item.category = category;

      const createdItem = await dataSource.getRepository(Item).save(item);

      return createdItem;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Mutation(() => Item)
  async updateItem(
    @Arg('itemId') id: string,
    @Arg('label') label: string,
    @Arg('emissionFactor') emissionFactor: number,
    @Arg('unit') unit: UnitEnum,
    @Arg('category') category: string,
  ): Promise<Item> {
    try {
      const targetedItem = await dataSource.getRepository(Item).findOne({
        where: {
          id,
        },
      });

      if (!targetedItem) throw new Error('Item not found');

      targetedItem.label = label;
      targetedItem.emissionFactor = emissionFactor;
      targetedItem.unit = unit;
      targetedItem.updatedAt = new Date();
      targetedItem.category.id = category;

      const updateItem = await dataSource
        .getRepository(Item)
        .save(targetedItem);

      return updateItem;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        console.error('Item not found');
      } else {
        console.error(error);
      }
      throw error;
    }
  }

  @Mutation(() => String)
  async deleteItem(@Arg('itemId') id: string): Promise<string> {
    const targetedItem = await dataSource
      .getRepository(Item)
      .findOneByOrFail({ id });

    await dataSource.getRepository(Item).remove(targetedItem);
    return 'Item deleted';
  }

  @Query(() => Item)
  async getItem(@Arg('itemId') id: string): Promise<Item> {
    try {
      const item = await dataSource.getRepository(Item).findOne({
        where: {
          id,
        },
        relations: {
          expenses: true,
          category: true,
        },
      });

      if (!item) throw new Error('Item not found');

      return item;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Query(() => [Item])
  async getAllItems(): Promise<Item[]> {
    try {
      const items = await dataSource.getRepository(Item).find({
        relations: {
          category: true,
          expenses: true,
        },
      });

      return items;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Query(() => [Item])
  async getItemByIdCategory(
    @Arg('categoryId') categoryId: string,
  ): Promise<Item[]> {
    try {
      const items = await dataSource.getRepository(Item).find({
        where: {
          category: {
            id: categoryId,
          },
        },
      });

      return items;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default ItemResolver;
