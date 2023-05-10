import { Service } from 'typedi';
import { IUser } from '../../../../domain/usecases/create-user-dto';
import { IUserRepository } from '../../../interfaces/user-repository';
import { User } from '../../graphql/models/user-model';
import { prisma } from './prisma-client';

@Service()
export class UserRepository implements IUserRepository {

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUniqueOrThrow({
      where: {
        email
      }
    });
  }

  async save(user: IUser): Promise<User> {
    return await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      }
    });
  }
}
