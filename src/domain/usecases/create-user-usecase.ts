import { Service } from 'typedi';
import { UserRepository } from '../../infra/api/repositores/prisma/user-repository';
import { validateUser } from '../../infra/api/validator/create-user-validator';
import { IUser } from './create-user-dto';

@Service()
export class CreateUserUseCase {
  constructor(private readonly userPostgresRepository: UserRepository) { }

  async execute(data: IUser) {
    const { error }: any = validateUser(data);

    if (error) {
      throw new Error(error);
    }

    const isUserAlreadyRegistered = await this.userPostgresRepository.findByEmail(data.email);

    if (isUserAlreadyRegistered) {
      throw new Error('User already registered');
    }

    const user = await this.userPostgresRepository.save(data);

    return user;
  }

}
