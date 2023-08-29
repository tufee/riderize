import { Service } from 'typedi';
import { CreateUserInput } from '../../infra/api/graphql/input/user-input';
import { UserWithoutPassword } from '../../infra/api/graphql/type/user-type';
import { UserRepository } from '../../infra/api/repositores/prisma/user-repository';
import { Encrypter } from '../../infra/helper/encrypter';

@Service()
export class CreateUserUseCase {
  constructor(
    private readonly userPostgresRepository: UserRepository,
    private readonly encrypter: Encrypter
  ) { }

  async execute(data: CreateUserInput): Promise<UserWithoutPassword> {

    if (data.email !== data.emailConfirmation) {
      throw new Error('Email confirmation does not match.');
    }

    if (data.password !== data.passwordConfirmation) {
      throw new Error('Password confirmation does not match.');
    }

    const isUserAlreadyRegistered = await this.userPostgresRepository.findByEmail(data.email);

    if (isUserAlreadyRegistered) {
      throw new Error('User already registered.');
    }

    const hashedPassword = await this.encrypter.encrypt(data.password);

    const savedUser = await this.userPostgresRepository.save({
      ...data,
      password: hashedPassword
    });

    return {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email
    };
  }
}
