import { IUser, IUserRequest, IUserResponse } from '../../../domain/interfaces/User';

export interface IUserRepository {
  save(user: IUserRequest): Promise<IUserResponse>;
  findByEmail(email: string): Promise<IUser | null>;
}
