import { IUser } from '../../domain/usecases/create-user-dto';
import { User } from '../api/graphql/models/user-model';

export interface IUserRepository {
  save(user: IUser): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
