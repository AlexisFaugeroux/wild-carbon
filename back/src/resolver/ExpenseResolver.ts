import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Context } from '../index';
import dataSource from '../utils';
import { Expense } from '../entity/Expense';
import { Item } from '../entity/Item';

@Resolver()
class ExpenseResolver {
  @Mutation(() => String)
  async createExpense(
    @Arg('itemId') itemId: string,
    @Arg('title') title: string,
    @Arg('quantity') quantity: number,
    @Ctx() contextValue: Context,
  ): Promise<string> {
    const expense = new Expense();

    const item = await dataSource
      .getRepository(Item)
      .findOneByOrFail({ id: itemId });

    if (!item) {
      throw new Error('Item introuvable dans la base de données');
    }

    if (quantity < 0 || quantity >= 500000 || quantity != null) {
      throw new Error('error quantity value');
    }

    expense.item = item;
    expense.user = contextValue.jwtPayload;
    expense.title = title;
    expense.emissionTotal = item.emissionFactor * quantity;
    expense.quantity = quantity;
    expense.createdAt = new Date();

    await dataSource.getRepository(Expense).save(expense);

    return 'Expense created';
  }

  @Mutation(() => Expense)
  async updateExpense(
    @Arg('id') id: string,
    @Arg('itemId') itemId: string,
    @Arg('title') title: string,
    @Arg('quantity') quantity: number,
    @Ctx() contextValue: Context,
  ): Promise<Expense> {
    const targetedExpense = await dataSource
      .getRepository(Expense)
      .findOneByOrFail({ id });

    const item = await dataSource
      .getRepository(Item)
      .findOneByOrFail({ id: itemId });

    if (!item) {
      throw new Error('Item introuvable dans la base de données');
    }

    if (quantity < 0 || quantity >= 500000 || quantity != null) {
      throw new Error('error quantity value');
    }

    targetedExpense.item = item;
    targetedExpense.user = contextValue.jwtPayload;
    targetedExpense.title = title;
    targetedExpense.emissionTotal = item.emissionFactor * quantity;
    targetedExpense.quantity = quantity;
    targetedExpense.updatedAt = new Date();

    const updateExpense = await dataSource
      .getRepository(Expense)
      .save(targetedExpense);

    return updateExpense;
  }

  @Mutation(() => String)
  async deleteExpense(@Arg('expenseId') id: string): Promise<string> {
    const targetedExpense = await dataSource
      .getRepository(Expense)
      .findOneByOrFail({ id });

    await dataSource.getRepository(Expense).remove(targetedExpense);
    return 'Expense deleted';
  }

  @Query(() => Expense)
  async getExpense(@Arg('expenseId') id: string): Promise<Expense> {
    const expense = await dataSource
      .getRepository(Expense)
      .findOneByOrFail({ id });
    return expense;
  }

  @Query(() => [Expense])
  async getAllExpenses(): Promise<Expense[]> {
    try {
      const expenses = await dataSource.getRepository(Expense).find();
      return expenses;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
export default ExpenseResolver;
