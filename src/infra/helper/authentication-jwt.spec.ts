import jwt from 'jsonwebtoken';
import { authConfig } from './authConfig';
import { AuthenticationJwt } from './authentication-jwt';
import logger from './logger';

jest.mock('jsonwebtoken');
jest.mock('./logger.ts');

describe('AuthenticationJwt', () => {
  const authenticateJwt = new AuthenticationJwt();

  const userIdMock = 'UUID';
  const tokenMock = 'token';
  const verifyMock = 'JwtPayload';

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('generateToken', () => {
    it('should generate a token with the correct payload', () => {
      (jwt.sign as jest.Mock).mockReturnValue(tokenMock);

      const result = authenticateJwt.generateToken(userIdMock);

      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: userIdMock },
        authConfig.jwt.secret,
        { expiresIn: authConfig.jwt.expiresIn }
      );

      expect(result).toBe(tokenMock);
    });

    it('should throw an error if jwt.sign throws an error', () => {
      const errorMock = new Error('JWT signing error');
      (jwt.sign as jest.Mock).mockImplementation(() => {
        throw errorMock;
      });

      expect(() => authenticateJwt.generateToken(userIdMock))
        .toThrowError('JWT signing error');

      expect(logger.warn).toHaveBeenCalledWith(errorMock);
    });
  });

  describe('verifyToken', () => {
    it('should verify a token with the correct payload', () => {
      (jwt.verify as jest.Mock).mockReturnValue(verifyMock);

      const result = authenticateJwt.verifyToken(tokenMock);

      expect(jwt.verify).toHaveBeenCalledWith(
        tokenMock,
        authConfig.jwt.secret,
      );

      expect(result).toBe(verifyMock);
    });

    it('should throw an error if jwt.verify throws an error', () => {
      const errorMock = new Error('Invalid token');
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw errorMock;
      });

      expect(() => authenticateJwt.verifyToken(tokenMock))
        .toThrowError('Invalid token');

      expect(logger.warn).toHaveBeenCalledWith(errorMock);
    });
  });
});

