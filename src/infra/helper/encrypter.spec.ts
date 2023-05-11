import { beforeEach, describe, expect, it } from 'vitest';
import { Encrypter } from './encrypter';

describe('Encrypter', () => {
  let encrypter: Encrypter;

  beforeEach(() => {
    encrypter = new Encrypter();
  });

  describe('encrypt', () => {
    it('should encrypt a password', async () => {
      const result = await encrypter.encrypt('password');

      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('decrypt', () => {
    it('should return true for matching passwords', async () => {
      const password = 'password';
      const hash = await encrypter.encrypt(password);

      const result = await encrypter.decrypt(password, hash);

      expect(result).toBe(true);
    });

    it('should return false for non-matching passwords', async () => {
      const password = 'password';
      const wrongPassword = 'wrongPassword';
      const hash = await encrypter.encrypt(password);

      const result = await encrypter.decrypt(wrongPassword, hash);

      expect(result).toBe(false);
    });
  });
});
