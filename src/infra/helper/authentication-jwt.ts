import jwt, { JwtPayload } from 'jsonwebtoken';
import { AuthChecker } from 'type-graphql';
import { Service } from 'typedi';
import { authConfig } from './authConfig';
import logger from './logger';

interface Context {
  token: string;
}

@Service()
export class AuthenticationJwt {
  generateToken(userId: string): string {
    try {
      return jwt.sign({ userId }, authConfig.jwt.secret,
        { expiresIn: authConfig.jwt.expiresIn }
      );
    } catch (error) {
      logger.warn(error);
      throw new Error('JWT signing error');
    }
  }

  verifyToken(token: string): JwtPayload | string {
    try {
      return jwt.verify(token, authConfig.jwt.secret);
    } catch (error) {
      logger.warn(error);
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
