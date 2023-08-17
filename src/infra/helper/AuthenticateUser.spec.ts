import { User } from '../api/graphql/models/user-model';
import { AuthenticateUser, Request } from './AuthenticateUser';

describe('AuthenticateUser', () => {
  const userPostgresRepository = {
    findByEmail: jest.fn(),
    save: jest.fn()
  };

  const encrypter = {
    encrypt: jest.fn(),
    decrypt: jest.fn()
  };

  const authenticateUser: AuthenticateUser = new AuthenticateUser(userPostgresRepository, encrypter);

  const user: User = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'hashedPassword'
  };

  const request: Request = {
    email: 'john.doe@example.com',
    password: 'password123'
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should throw an error if user is not found', async () => {
    userPostgresRepository.findByEmail.mockResolvedValueOnce(null);

    await expect(authenticateUser.execute(request)).rejects.toThrow('User or password is incorrect');

    expect(userPostgresRepository.findByEmail).toHaveBeenCalledWith(request.email);
  });

  it('should throw an error if password does not match', async () => {
    userPostgresRepository.findByEmail.mockResolvedValueOnce(user);
    encrypter.decrypt.mockResolvedValueOnce(false);

    await expect(authenticateUser.execute(request)).rejects.toThrow('User or password is incorrect');

    expect(userPostgresRepository.findByEmail).toHaveBeenCalledWith(request.email);
    expect(encrypter.decrypt).toHaveBeenCalledWith(request.password, user.password);
  });

  it('should return the user and token if authentication is successful', async () => {
    userPostgresRepository.findByEmail.mockResolvedValueOnce(user);
    encrypter.decrypt.mockResolvedValueOnce(true);

    const response = await authenticateUser.execute(request);

    expect(response.user).toEqual(user);
    expect(typeof response.token).toBe('string');
    expect(userPostgresRepository.findByEmail).toHaveBeenCalledWith(request.email);
    expect(encrypter.decrypt).toHaveBeenCalledWith(request.password, user.password);
  });
});

