import { describe, expect, it } from 'vitest';
import { validateUser } from './create-user-validator';

describe('validateUser', () => {
  it('should return the user if all properties are valid', () => {
    const user: any = {
      name: 'John Doe',
      email: 'test@example.com',
      emailConfirmation: 'test@example.com',
      password: 'password123',
      passwordConfirmation: 'password123',
    };

    const result = validateUser(user);

    expect(result).toEqual({ value: user });
  });

  it('should return an error if name is missing', () => {
    const user: any = {
      emailConfirmation: 'test@example.com',
      password: 'password123',
      passwordConfirmation: 'password123',
    };

    const result = validateUser(user);

    expect(result).toEqual({ error: ['"name" is required'] });
  });

  it('should return an error if email is missing', () => {
    const user: any = {
      name: 'John Doe',
      emailConfirmation: 'test@example.com',
      password: 'password123',
      passwordConfirmation: 'password123',
    };

    const result = validateUser(user);

    expect(result).toEqual({ error: ['"email" is required'] });
  });

  it('should return an error if email is not a valid email address', () => {
    const user: any = {
      name: 'John Doe',
      email: 'notanemailaddress',
      emailConfirmation: 'notanemailaddress',
      password: 'password123',
      passwordConfirmation: 'password123',
    };

    const result = validateUser(user);

    expect(result).toEqual({ error: ['"email" must be a valid email'] });
  });

  it('should return an error if email confirmation does not match email', () => {
    const user: any = {
      name: 'John Doe',
      email: 'test@example.com',
      emailConfirmation: 'different@example.com',
      password: 'password123',
      passwordConfirmation: 'password123',
    };

    const result = validateUser(user);

    expect(result).toEqual({
      error: ['"emailConfirmation" must be [ref:email]'],
    });
  });

  it('should return an error if password is too short', () => {
    const user: any = {
      name: 'John Doe',
      email: 'test@example.com',
      emailConfirmation: 'test@example.com',
      password: 'short',
      passwordConfirmation: 'short',
    };

    const result = validateUser(user);

    expect(result).toEqual({
      error: ['"password" length must be at least 8 characters long'],
    });
  });

  it('should return an error if password confirmation does not match password', () => {
    const user: any = {
      name: 'John Doe',
      email: 'test@example.com',
      emailConfirmation: 'test@example.com',
      password: 'password123',
      passwordConfirmation: 'differentpassword',
    };

    const result = validateUser(user);

    expect(result).toEqual({
      error: ['"passwordConfirmation" must be [ref:password]'],
    });
  });
});
