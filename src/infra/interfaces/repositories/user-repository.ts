import { IUser, IUserRequest } from '../../../domain/interfaces/User';

export interface IUserRepository {
  save(user: IUserRequest): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
}
