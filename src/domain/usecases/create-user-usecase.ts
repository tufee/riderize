import { Service } from 'typedi';
import { UserRepository } from '../../infra/api/repositores/prisma/user-repository';
import { validateUser } from '../../infra/api/validator/create-user-validator';
import { Encrypter } from '../../infra/helper/encrypter';
import { IUser } from './create-user-dto';

@Service()
export class CreateUserUseCase {
  constructor(
    private readonly userPostgresRepository: UserRepository,
    private readonly encrypter: Encrypter
  ) { }

  async execute(data: IUser) {
    const { error }: any = validateUser(data);

    if (error) {
      throw new Error(error);
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
