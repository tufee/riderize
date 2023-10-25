import { Service } from 'typedi';
import { IUserRepository } from '../../../interfaces/repositories/user-repository';
import { CreateUserInput } from '../../graphql/input/user-input';
import { User } from '../../graphql/type/user-type';
import { prisma } from './prisma-client';

@Service()
export class UserRepository implements IUserRepository {

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email
      }
    });
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id
      }
    });
  }

  async save(user: CreateUserInput): Promise<User> {
    return await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      }
    });
  }
}
