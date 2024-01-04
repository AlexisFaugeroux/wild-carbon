import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';

import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import dataSource from '../utils';
import { User } from '../entity/User';
import { EntityNotFoundError } from 'typeorm';
import { Context } from '..';
import LoginResponse from '../helpers/LoginResponse';

@Resolver()
class UserResolver {
  @Mutation(() => User)
  async createUser(
    @Arg('pseudo') pseudo: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<User> {
    try {
      if (!pseudo || !email || !password) {
        throw new Error(
          'One of the following fields is missing : pseudo, password, email',
        );
      }

      const user = new User();
      user.pseudo = pseudo;
      user.email = email;
      user.password = await argon2.hash(password);
      const createdUser = await dataSource.getRepository(User).save(user);
      return createdUser;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Mutation(() => User)
  async updateUser(
    @Arg('userId') id: string,
    @Arg('pseudo', { nullable: true }) pseudo: string,
    @Arg('email', { nullable: true }) email: string,
    @Arg('password', { nullable: true }) password: string,
  ): Promise<User> {
    try {
      // Check first if provided id matches a user in database. If not, the save() method below will create a new user.
      const targetedUser = await dataSource
        .getRepository(User)
        .findOneByOrFail({ id }); // This method throws an error if no user is found in database

      if (pseudo) {
        targetedUser.pseudo = pseudo;
      }

      if (email) {
        targetedUser.email = email;
      }

      if (password) {
        targetedUser.password = await argon2.hash(password);
      }

      const updatedUser = await dataSource
        .getRepository(User)
        .save(targetedUser); // Since targeted.id matches a user in database, save() knows it has to update the user instead of creating a new one
      return updatedUser;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        console.error('User not found');
      } else {
        console.error(error);
      }
      throw error;
    }
  }

  @Mutation(() => String)
  async deleteUser(@Arg('userId') id: string): Promise<string> {
    const targetedUser = await dataSource
      .getRepository(User)
      .findOneByOrFail({ id });

    await dataSource.getRepository(User).remove(targetedUser);
    return 'User deleted';
  }

  @Query(() => User)
  async getUser(
    @Arg('userId') id: string,
  ): Promise<User> {
    try {
      const user = await dataSource.getRepository(User).findOne({
        where: {
          id,
        },
        relations: {
          articles: true,
          expenses: {
            item: true,
          },
          users: true,
        },
      });

      if (!user) throw new Error('User not found');

      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    try {
      const users = await dataSource.getRepository(User).find({
        relations: {
          articles: true,
          expenses: {
            item: true,
          },
          users: true,
        },
      });

      return users;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<LoginResponse> {
    console.log('login attempt detected');
    const user = await dataSource.getRepository(User).findOneBy({ email });
    const isUserValid =
      user !== null && (await argon2.verify(user.password, password));
    if (isUserValid) {
      // we just need the user object without password
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, articles, expenses, users, ...userData } = user;
      const jwtKey =  process.env.JWT_KEY as string;
      const token = jwt.sign(userData, jwtKey, { expiresIn: '24h' }); 
      const response: LoginResponse = { user, token, success: true };
      return response;
    } else {
      console.log('invalid credentials sir');
      const response: LoginResponse = { user: null, token: '', success: false };
      return response;
    }
  }

  @Mutation(() => String)
  async addFriend(
    @Arg('userId', { nullable: true }) userId: string,
    @Arg('userIdToAdd') userIdToAdd: string,
    @Ctx() contextValue: Context,
  ): Promise<string> {
    const userRepo = dataSource.getRepository(User);
    const currentUserId = contextValue.jwtPayload?.id ?? userId;
    const currentUser = await userRepo.findOne({
      where: { id: currentUserId },
      relations: { users: true },
    });
    if (currentUser) {
      const friend = await userRepo.findOneByOrFail({ id: userIdToAdd });
      currentUser.users = currentUser.users
        ? [...currentUser.users, friend]
        : [friend];
      await userRepo.save(currentUser);
      return 'Friend added';
    }
    throw new Error('Something broke, try again');
  }

  @Mutation(() => String)
  async removeFriend(
    @Arg('userId') userId: string,
    @Arg('userIdToRemove') userIdToRemove: string,
    @Ctx() contextValue: Context,
  ): Promise<string> {
    const userRepo = dataSource.getRepository(User);
    const currentUserId = contextValue.jwtPayload?.id ?? userId;

    console.log(contextValue.jwtPayload);

    const currentUser = await dataSource.getRepository(User).findOne({
      where: {
        id: currentUserId,
      },
      relations: {
        users: true,
      },
    });

    if (!currentUser) throw new Error('User not found');

    currentUser.users = currentUser.users.filter(
      (friend) => friend.id !== userIdToRemove,
    );
    await userRepo.save(currentUser);
    return 'Friend removed';
  }
}

export default UserResolver;
