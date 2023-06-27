import { sign } from 'jsonwebtoken';
import { User } from '../api/graphql/models/user-model';
import { UserRepository } from '../api/repositores/prisma/user-repository';
import { authConfig } from './authConfig';
import { Encrypter } from './encrypter';

export interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

export class AuthenticateUser {
  constructor(
    private readonly userPostgresRepository: UserRepository,
    private readonly encrypter: Encrypter
  ) { }

  async execute({ email, password }: Request): Promise<Response> {

    const user = await this.userPostgresRepository.findByEmail(email);

    if (!user) {
      throw new Error('User or password is incorrect');
    }

    const passwordMatched = await this.encrypter.decrypt(password, user.password);

    if (!passwordMatched) {
      throw new Error('User or password is incorrect');
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}
