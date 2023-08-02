import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import dataSource from '../utils';
import { Expense } from '../entity/Expense';
import { User } from '../entity/User';
import { Item } from '../entity/Item';

@Resolver()
class ExpenseResolver {
  @Mutation(() => String)
  async createExpense(
    @Arg('itemId') id: Item,
    @Arg('userId') idUser: User,
    @Arg('title') title: string,
    @Arg('quantity') quantity: number,
    @Arg('emissionFactorTotal') emissionFactorTotal: number,
  ): Promise<string> {
    const expense = new Expense();

    const item = await dataSource.getRepository(Item).findOneByOrFail(id);
    if (!item) {
      throw new Error('Item introuvable dans la base de données');
    }

    expense.item = id;
    expense.user = idUser;
    expense.title = title;
    expense.emissionFactorTotal = emissionFactorTotal;
    expense.quantity = quantity;
    expense.createdAt = new Date();

    await dataSource.getRepository(Expense).save(expense);

    return 'Expense created';
  }

  @Mutation(() => Number)
  async calculatingEmissionFactor(
    @Arg('itemId') id: Item,
    @Arg('quantity') quantity: number,
  ): Promise<number> {
    const item = await dataSource.getRepository(Item).findOneByOrFail(id);

    if (!item) {
      throw new Error('Item introuvable dans la base de données');
    }

    const emissionFactorCO2 = item.emissionFactor * quantity;
    return emissionFactorCO2;
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
      throw error;
    }
  }
}
export default ExpenseResolver;
