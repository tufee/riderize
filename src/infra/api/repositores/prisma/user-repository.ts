import { Service } from 'typedi';
import { IUser, IUserRequest } from '../../../../domain/interfaces/User';
import { IUserRepository } from '../../../interfaces/repositories/user-repository';
import { prisma } from './prisma-client';

@Service()
export class UserRepository implements IUserRepository {

  async findByEmail(email: string): Promise<IUser | null> {
    return await prisma.user.findUnique({
      where: {
        email
      }
    });
  }

  async save(user: IUserRequest): Promise<IUser> {
    return await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      }
    });
  }
}
