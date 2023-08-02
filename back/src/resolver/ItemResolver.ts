import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import dataSource from '../utils';
import { Item } from '../entity/Item';
import { EntityNotFoundError } from 'typeorm';
import UnitEnum from "../enum/unitEnum";

@Resolver()
class ItemResolver {
    @Mutation(() => Item)
    async createItem(
        @Arg('label') label: string, 
        @Arg('emissionFactor') emissionFactor: number,
        @Arg('unit') unit: UnitEnum,
        @Arg('category') category: string,
    ): Promise<Item> {
        try{
            if(!label || !emissionFactor || !unit || !category){
                throw new Error(
                    'One of the fields is missing',
                );
            }
            const item = new Item ();
            item.label = label;
            item.emissionFactor = emissionFactor;
            item.unit = unit;
            item.createdAt = new Date();
            item.category.id = category;

            const createdItem = await dataSource
                .getRepository(Item)
                .save(item);
            return createdItem;
        } catch(error){
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
    ): Promise<Item>{
        try{
            const targetedItem = await dataSource
            .getRepository(Item)
            .findOneByOrFail({id})

            targetedItem.label = label;
            targetedItem.emissionFactor = emissionFactor;
            targetedItem.unit = unit;
            targetedItem.updatedAt = new Date();
            targetedItem.category.id = category;

            const updateItem = await dataSource
            .getRepository(Item)
            .save(targetedItem);

            return updateItem;
        } catch(error){
            if (error instanceof EntityNotFoundError){
                console.error('Item not found');
            } else{
                console.error(error);
            }
            throw error;
        }
    }
    @Mutation(() => String)
    async deleteItem(@Arg('itemId') id: string): Promise<String>{
        const targetedItem = await dataSource
            .getRepository(Item)
            .findOneByOrFail({id});
        
            await dataSource.getRepository(Item).remove(targetedItem);
            return 'Item deleted';
    }

    @Query(() => Item)
    async getItem(@Arg('itemId') id: string): Promise<Item>{
        const item = await dataSource
            .getRepository(Item)
            .findOneByOrFail({id}); 

        return item
    }

    @Query(() => [Item])
    async getAllItems(): Promise<Item[]>{
        try{
            const items = await dataSource.getRepository(Item).find();
            return items;
        } catch (error){
            throw error;
        }
        
    }
    
}

export default ItemResolver;
