import { Service } from 'typedi';
import { UserRepository } from '../../infra/api/repositores/prisma/user-repository';
import { Encrypter } from '../../infra/helper/encrypter';
import { IUserRequest } from '../interfaces/User';

@Service()
export class CreateUserUseCase {
  constructor(
    private readonly userPostgresRepository: UserRepository,
    private readonly encrypter: Encrypter
  ) { }

  async execute(data: IUserRequest) {

    if (data.email !== data.emailConfirmation) {
      throw new Error('Email confirmation does not match.');
    }

    if (data.password !== data.passwordConfirmation) {
      throw new Error('password confirmation does not match.');
    }

    const isUserAlreadyRegistered = await this.userPostgresRepository.findByEmail(data.email);

    if (isUserAlreadyRegistered) {
      throw new Error('User already registered');
    }

    const hashedPassword = await this.encrypter.encrypt(data.password);

    data.password = hashedPassword;

    const user = await this.userPostgresRepository.save(data);

    return user;
  }
}
