import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';

import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import dataSource from '../utils';
import { User } from '../entity/User';
import { EntityNotFoundError } from 'typeorm';

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
    @Arg('pseudo') pseudo: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<User> {
    try {
      // Check first if provided id matches a user in database. If not, the save() method below will create a new user.
      const targetedUser = await dataSource
        .getRepository(User)
        .findOneByOrFail({ id }); // This method throws an error if no user is found in database

      const hashedPassword = await argon2.hash(password);

      targetedUser.pseudo = pseudo;
      targetedUser.email = email;
      targetedUser.password = hashedPassword;

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
  async deleteUser(@Arg('userId') id: string): Promise<String> {
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
      throw error;
    }
  }

  @Query(() => String)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<String> {
    const user = await dataSource
      .getRepository(User)
      .findOneByOrFail({ email });
    try {
      if (await argon2.verify(user.password, password)) {
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
}

export default UserResolver;
