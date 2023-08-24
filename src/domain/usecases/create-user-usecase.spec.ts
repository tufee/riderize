import { UserRepository } from '../../infra/api/repositores/prisma/user-repository';
import { Encrypter } from '../../infra/helper/encrypter';
import { IUser, IUserRequest } from '../interfaces/User';
import { CreateUserUseCase } from './create-user-usecase';

jest.mock('../../infra/api/repositores/prisma/user-repository');
jest.mock('../../infra/helper/encrypter');

describe('CreateUserUseCase', () => {
  const UserRepositoryMock = UserRepository as jest.Mock<UserRepository>;
  const EncrypterMock = Encrypter as jest.Mock<Encrypter>;

  const userPostgresRepositoryMock = new UserRepositoryMock() as
    jest.Mocked<UserRepository>;
  const encrypterMock = new EncrypterMock() as jest.Mocked<Encrypter>;

  const createUserUseCase = new CreateUserUseCase(
    userPostgresRepositoryMock, encrypterMock
  );

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should create a new user if all data is valid and user is not already registered',
    async () => {
      const newUser: IUser = {
        id: 'UUID',
        name: 'john',
        email: 'johndoe@example.com',
        password: 'hashedPassword',
      };

      const newUserRequest: IUserRequest = {
        name: 'john',
        email: 'johndoe@example.com',
        emailConfirmation: 'johndoe@example.com',
        password: '12345678',
        passwordConfirmation: '12345678',
      };

      userPostgresRepositoryMock.findByEmail.mockResolvedValue(null);
      encrypterMock.encrypt.mockResolvedValue('hashedPassword');
      userPostgresRepositoryMock.save.mockResolvedValue(newUser);

      const result = await createUserUseCase.execute(newUserRequest);

      expect(result).toEqual({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      });

      expect(userPostgresRepositoryMock.findByEmail)
        .toHaveBeenCalledWith(newUserRequest.email);

      expect(encrypterMock.encrypt)
        .toHaveBeenCalledWith(newUserRequest.password);

      expect(userPostgresRepositoryMock.save)
        .toHaveBeenCalledWith({
          ...newUserRequest,
          password: 'hashedPassword'
        });
    });

  it('should throw an error if email and emailConfirmation does not match',
    async () => {
      const invalidUserRequest: IUserRequest = {
        name: 'john',
        email: 'johndoe@example.com',
        emailConfirmation: 'johndoe2@example.com',
        password: '12345678',
        passwordConfirmation: '12345678',
      };

      await expect(createUserUseCase.execute(invalidUserRequest))
        .rejects
        .toThrowError('Email confirmation does not match.');
    });

  it('should throw an error if password and passwordConfirmation does not match',
    async () => {
      const invalidUserRequest: IUserRequest = {
        name: 'john',
        email: 'johndoe@example.com',
        emailConfirmation: 'johndoe@example.com',
        password: '12345678',
        passwordConfirmation: '12345678999',
      };

      await expect(createUserUseCase.execute(invalidUserRequest))
        .rejects
        .toThrowError('Password confirmation does not match.');
    });

  it('should throw an error if user is already registered', async () => {
    const user: IUser = {
      id: 'UUID',
      name: 'john',
      email: 'johndoe@example.com',
      password: '12345678'
    };

    const userRequest: IUserRequest = {
      name: 'john',
      email: 'johndoe@example.com',
      emailConfirmation: 'johndoe@example.com',
      password: '12345678',
      passwordConfirmation: '12345678',
    };

    userPostgresRepositoryMock.findByEmail.mockResolvedValue(user);

    await expect(createUserUseCase.execute(userRequest))
      .rejects
      .toThrowError('User already registered.');

    expect(userPostgresRepositoryMock.findByEmail)
      .toHaveBeenCalledWith(userRequest.email);
  });
});
