import jwt from 'jsonwebtoken';
import { AuthChecker } from 'type-graphql';
import { Service } from 'typedi';
import { authConfig } from './authConfig';

interface Context {
  token: string;
}

@Service()
export class AuthenticationJwt {
  generateToken(userId: string): string {
    const payload = { userId };
    return jwt.sign(payload, authConfig.jwt.secret,
      { expiresIn: authConfig.jwt.expiresIn }
    );
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, authConfig.jwt.secret);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  authenticate: AuthChecker<Context> = ({ context }): boolean => {
    const authHeader = context.token;

    if (!authHeader) return false;

    const [, token] = authHeader.split(' ');

    return !!this.verifyToken(token);
  };
}




