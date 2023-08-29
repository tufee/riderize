import { Service } from 'typedi';
import { AuthenticationToken } from '../../infra/api/graphql/type/authentication-type';
import { UserRepository } from '../../infra/api/repositores/prisma/user-repository';
import { AuthenticationJwt } from '../../infra/helper/authentication-jwt';
import { Encrypter } from '../../infra/helper/encrypter';

export interface Request {
  email: string;
  password: string;
}

@Service()
export class AuthenticateUserUseCase {
  constructor(
    private readonly userPostgresRepository: UserRepository,
    private readonly encrypter: Encrypter,
    private readonly authenticationJwt: AuthenticationJwt
  ) { }

  async execute({ email, password }: Request): Promise<AuthenticationToken> {

    const user = await this.userPostgresRepository.findByEmail(email);

    if (!user) {
      throw new Error('User or password is incorrect');
    }

    const passwordMatched = await this.encrypter.decrypt(password, user.password);

    if (!passwordMatched) {
      throw new Error('User or password is incorrect');
    }

    const token = this.authenticationJwt.generateToken(user.id);

    return { token };
  }
}
