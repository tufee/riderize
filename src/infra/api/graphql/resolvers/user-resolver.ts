import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { CreateUserUseCase } from '../../../../domain/usecases/create-user-usecase';
import logger from '../../../helper/logger';
import { UserRepository } from '../../repositores/prisma/user-repository';
import { UserInput } from '../input/user-input';
import { User } from '../models/user-model';

@Service()
@Resolver()
export class UserResolver {
  constructor(
    private readonly userPostgresRepository: UserRepository,
    private readonly createUserUseCase: CreateUserUseCase
  ) { }

  @Query(() => User)
  async findByEmail(@Arg('email') email: string): Promise<User | null> {
    try {
      return await this.userPostgresRepository.findByEmail(email);

    } catch (error: any) {
      logger.warn(error);
      throw new Error('User not found');
    }
  }

  @Mutation(() => User)
  async save(@Arg('data') data: UserInput): Promise<User> {
    try {
      return await this.createUserUseCase.execute(data);

    } catch (error: any) {
      logger.warn(error);
      throw new Error(error);
    }

  }
}

