import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { AuthenticateUserUseCase } from '../../../../domain/usecases/authenticate-user-usecase';
import { CreateUserUseCase } from '../../../../domain/usecases/create-user-usecase';
import logger from '../../../helper/logger';
import { UserRepository } from '../../repositores/prisma/user-repository';
import { LoginInput } from '../input/login-input';
import { UserInput } from '../input/user-input';
import { AuthenticationToken } from '../models/authentication-model';
import { User, UserWithoutPassword } from '../models/user-model';

@Service()
@Resolver()
export class UserResolver {
  constructor(
    private readonly userPostgresRepository: UserRepository,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly authenticateUserUseCase: AuthenticateUserUseCase
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

  @Mutation(() => UserWithoutPassword)
  async save(@Arg('data') data: UserInput): Promise<UserWithoutPassword> {
    try {
      return await this.createUserUseCase.execute(data);

    } catch (error: any) {
      logger.warn(error);
      throw new Error(error);
    }
  }

  @Mutation(() => AuthenticationToken)
  async login(@Arg('data') data: LoginInput): Promise<AuthenticationToken> {
    try {
      return await this.authenticateUserUseCase.execute(data);

    } catch (error: any) {
      logger.warn(error);
      throw new Error(error);
    }

  }
}

