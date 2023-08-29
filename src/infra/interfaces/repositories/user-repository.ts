import { CreateUserInput } from '../../api/graphql/input/user-input';
import { User } from '../../api/graphql/type/user-type';

export interface IUserRepository {
  save(user: CreateUserInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
