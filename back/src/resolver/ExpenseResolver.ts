import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import dataSource from '../utils';
import { Expense } from '../entity/Expense';
import { Item } from '../entity/Item';
import { User } from '../entity/User';

@Resolver()
class ExpenseResolver {
  @Mutation(() => String)
  async createExpense(
    @Arg('itemId') itemId: string,
    @Arg('title') title: string,
    @Arg('quantity') quantity: number,
    @Arg('expenseDate') expenseDate: string,
    @Arg('userId') userId: string,
  ): Promise<string> {
    const expense = new Expense();

    const item = await dataSource
      .getRepository(Item)
      .findOneByOrFail({ id: itemId });

    const user = await dataSource
      .getRepository(User)
      .findOneByOrFail({ id: userId });

    if (!item) {
      throw new Error('Item introuvable dans la base de données');
    }

    if (quantity < 0 || quantity >= 500000 || quantity == null) {
      throw new Error('error quantity value');
    }

    expense.item = item;
    expense.user = user;
    expense.title = title;
    expense.emissionTotal = item.emissionFactor * quantity;
    expense.quantity = quantity;
    expense.expenseDate = expenseDate;
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
    @Arg('expenseDate', { nullable: true }) expenseDate: string,
    @Arg('userId') userId: string,
  ): Promise<Expense> {
    const targetedExpense = await dataSource
      .getRepository(Expense)
      .findOne({ where: { id }, relations: { user: true } });

    const user = await dataSource
      .getRepository(User)
      .findOneByOrFail({ id: userId });

    if (!targetedExpense) throw new Error('Expense not found');

    if (targetedExpense.user.id !== userId) {
      throw new Error("You're not the owner of this expense");
    }

    const item = await dataSource
      .getRepository(Item)
      .findOneByOrFail({ id: itemId });

    if (!item) {
      throw new Error('Item not found');
    }

    if (quantity < 0 || quantity >= 500000 || quantity === null) {
      throw new Error('Quantity value is not valid');
    }

    targetedExpense.item = item;
    targetedExpense.user = user;
    targetedExpense.title = title;
    targetedExpense.emissionTotal = item.emissionFactor * quantity;
    targetedExpense.quantity = quantity;
    targetedExpense.expenseDate = expenseDate
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
    try {
      const expense = await dataSource.getRepository(Expense).findOne({
        where: {
          id,
        },
        relations: {
          item: true,
          user: true,
        },
      });

      if (!expense) throw new Error('Expense not found');

      return expense;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }

  @Query(() => [Expense])
  async getAllExpenses(): Promise<Expense[]> {
    try {
      const expenses = await dataSource.getRepository(Expense).find({
        relations: {
          item: true,
          user: true,
        },
      });

      return expenses;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Query(() => [Expense])
  async getAllExpensesByUserId(@Arg('userId') id: string): Promise<Expense[]> {
    try {
      const expensesByUserId = await dataSource.getRepository(Expense).find({
        where: {
          user: { id: id},
        },
        relations: {
          item: {
            category: true
          },
          user: true
        },
      });

      if (!expensesByUserId) throw new Error('Expenses not found for this user');
      return expensesByUserId;
    } catch (error) {
      console.error(error)
      throw new Error;
      
    }
  }
} 
export default ExpenseResolver;
