import { User } from '../../infra/api/graphql/type/user-type';
import { UserRepository } from '../../infra/api/repositores/prisma/user-repository';
import { AuthenticationJwt } from '../../infra/helper/authentication-jwt';
import { Encrypter } from '../../infra/helper/encrypter';
import { AuthenticateUserUseCase } from './authenticate-user-usecase';

jest.mock('../../infra/api/repositores/prisma/user-repository');
jest.mock('../../infra/helper/encrypter');
jest.mock('../../infra/helper/authentication-jwt');

describe('AuthenticateUserUseCase', () => {
  const UserRepositoryMock = UserRepository as jest.Mock<UserRepository>;
  const EncrypterMock = Encrypter as jest.Mock<Encrypter>;
  const AuthenticationJwtMock = AuthenticationJwt as jest.Mock<AuthenticationJwt>;

  const userPostgresRepositoryMock = new UserRepositoryMock() as
    jest.Mocked<UserRepository>;
  const encrypterMock = new EncrypterMock() as jest.Mocked<Encrypter>;
  const authenticationJwtMock = new AuthenticationJwtMock() as
    jest.Mocked<AuthenticationJwt>;

  const authenticateUserUseCase = new AuthenticateUserUseCase(
    userPostgresRepositoryMock, encrypterMock, authenticationJwtMock
  );

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Should return a token if authentication succeeds', async () => {
    const user: User = {
      id: 'UUID',
      name: 'john',
      email: 'john@example',
      password: 'hashedPassword'
    };

    userPostgresRepositoryMock.findByEmail.mockResolvedValue(user);
    encrypterMock.decrypt.mockResolvedValue(true);
    authenticationJwtMock.generateToken.mockReturnValue('token');

    const request = {
      email: 'john@example.com',
      password: '12345678'
    };

    const token = await authenticateUserUseCase.execute(request);

    expect(token).toEqual({ token: 'token' });
    expect(userPostgresRepositoryMock.findByEmail)
      .toHaveBeenCalledWith(
        request.email
      );

    expect(encrypterMock.decrypt)
      .toHaveBeenCalledWith(
        request.password, user.password
      );

    expect(authenticationJwtMock.generateToken)
      .toHaveBeenCalledWith(
        user.id
      );
  });

  it('Should throw an error if user is not found', async () => {
    const request = {
      email: 'john_fail@example.com',
      password: '12345678'
    };

    userPostgresRepositoryMock.findByEmail.mockResolvedValue(null);

    await expect(authenticateUserUseCase.execute(request))
      .rejects
      .toThrowError('User or password is incorrect');

    expect(userPostgresRepositoryMock.findByEmail)
      .toHaveBeenCalledWith(
        request.email
      );
  });

  it('Should throw an error if user password does not match', async () => {
    const user: User = {
      id: 'UUID',
      name: 'john',
      email: 'john@example',
      password: 'hashedPassword'
    };

    const request = {
      email: 'john@example.com',
      password: '12345678'
    };

    userPostgresRepositoryMock.findByEmail.mockResolvedValue(user);
    encrypterMock.decrypt.mockResolvedValue(false);

    await expect(authenticateUserUseCase.execute(request))
      .rejects
      .toThrowError('User or password is incorrect');

    expect(userPostgresRepositoryMock.findByEmail)
      .toHaveBeenCalledWith(
        request.email
      );

    expect(encrypterMock.decrypt)
      .toHaveBeenCalledWith(
        request.password, user.password
      );
  });
});
