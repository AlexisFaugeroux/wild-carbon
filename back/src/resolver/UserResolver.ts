import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';

import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import dataSource from '../utils';
import { User } from '../entity/User';
import { EntityNotFoundError } from 'typeorm';
import { Context } from '..';

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
  async getUser(@Arg('userId') id: string): Promise<User> {
    const user = await dataSource.getRepository(User).findOneByOrFail({ id });

    return user;
  }

  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    try {
      const users = await dataSource.getRepository(User).find();
      return users;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Query(() => String)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<string> {
    const user = await dataSource
      .getRepository(User)
      .findOneByOrFail({ email });
    try {
      if (await argon2.verify(user.password, password)) {
        // we just need the user object without password
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userData } = user;
        const token = jwt.sign(userData, 'supersecretkey');
        return token;
      } else {
        return 'error';
      }
    } catch (err) {
      console.log(err);
      return 'error';
    }
  }

  @Mutation(() => String)
  async addFriend(
    @Arg('userId') userId: string,
    @Arg('userIdToAdd') userIdToAdd: string,
    @Ctx() contextValue: Context,
  ): Promise<string> {
    const UserRepo = dataSource.getRepository(User);
    const currentUserId = contextValue.jwtPayload?.id ?? userId;
    const currentUser = await UserRepo.findOne({
      where: { id: currentUserId },
      relations: { users: true },
    });
    if (currentUser) {
      const friend = await UserRepo.findOneByOrFail({ id: userIdToAdd });
      currentUser.users = currentUser.users
        ? [...currentUser.users, friend]
        : [friend];
      await UserRepo.save(currentUser);
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
    const UserRepo = dataSource.getRepository(User);
    const currentUserId = contextValue.jwtPayload?.id ?? userId;
    const currentUser =
      contextValue.jwtPayload ??
      (await UserRepo.findOne({
        where: { id: currentUserId },
        relations: { users: true },
      }));
    currentUser.users = currentUser.users.filter(
      (friend) => friend.id !== userIdToRemove,
    );
    await UserRepo.save(currentUser);
    return 'Friend removed';
  }

  @Query(() => [User])
  async getFriends(
    @Arg('userId') userId: string,
    @Ctx() contextValue: Context,
  ): Promise<User[] | null> {
    try {
      const UserRepo = dataSource.getRepository(User);
      const currentUserId = contextValue.jwtPayload?.id ?? userId;
      const currentUser = await UserRepo.findOne({
        where: { id: currentUserId },
        relations: { users: true },
      });
      if (currentUser) {
        return currentUser.users;
      }
      return null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default UserResolver;
