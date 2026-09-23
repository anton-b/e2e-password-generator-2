import { generatePassword, generatePasswords } from '../src/generate.js';

describe('generatePassword', () => {
  test('generates password of correct length', () => {
    const charset = 'abc123';
    const password = generatePassword(10, charset);
    expect(password).toHaveLength(10);
  });

  test('uses only characters from charset', () => {
    const charset = 'abc';
    const password = generatePassword(100, charset);
    const allValid = password.split('').every(char => charset.includes(char));
    expect(allValid).toBe(true);
  });

  test('generates different passwords on repeated calls', () => {
    const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const password1 = generatePassword(16, charset);
    const password2 = generatePassword(16, charset);
    expect(password1).not.toBe(password2);
  });

  test('handles minimum length (1)', () => {
    const charset = 'a';
    const password = generatePassword(1, charset);
    expect(password).toBe('a');
  });

  test('handles maximum length (1000)', () => {
    const charset = 'abc';
    const password = generatePassword(1000, charset);
    expect(password).toHaveLength(1000);
  });

  test('throws on length < 1', () => {
    expect(() => generatePassword(0, 'abc')).toThrow('Password length must be between 1 and 1000');
  });

  test('throws on length > 1000', () => {
    expect(() => generatePassword(1001, 'abc')).toThrow('Password length must be between 1 and 1000');
  });

  test('throws on empty charset', () => {
    expect(() => generatePassword(10, '')).toThrow('Character set cannot be empty');
  });

  test('throws on null charset', () => {
    expect(() => generatePassword(10, null)).toThrow('Character set cannot be empty');
  });

  test('handles large charsets', () => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    const password = generatePassword(20, charset);
    expect(password).toHaveLength(20);
    const allValid = password.split('').every(char => charset.includes(char));
    expect(allValid).toBe(true);
  });

  test('handles single character charset', () => {
    const password = generatePassword(10, 'a');
    expect(password).toBe('aaaaaaaaaa');
  });
});

describe('generatePasswords', () => {
  test('generates correct number of passwords', () => {
    const passwords = generatePasswords(5, 10, 'abc123');
    expect(passwords).toHaveLength(5);
  });

  test('each password has correct length', () => {
    const passwords = generatePasswords(3, 12, 'abc');
    passwords.forEach(password => {
      expect(password).toHaveLength(12);
    });
  });

  test('generates unique passwords', () => {
    const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const passwords = generatePasswords(10, 16, charset);
    const uniquePasswords = new Set(passwords);
    // With high probability, all should be unique
    expect(uniquePasswords.size).toBeGreaterThan(8);
  });

  test('handles minimum count (1)', () => {
    const passwords = generatePasswords(1, 10, 'abc');
    expect(passwords).toHaveLength(1);
  });

  test('handles maximum count (1000)', () => {
    const passwords = generatePasswords(1000, 1, 'a');
    expect(passwords).toHaveLength(1000);
  });

  test('throws on count < 1', () => {
    expect(() => generatePasswords(0, 10, 'abc')).toThrow('Password count must be between 1 and 1000');
  });

  test('throws on count > 1000', () => {
    expect(() => generatePasswords(1001, 10, 'abc')).toThrow('Password count must be between 1 and 1000');
  });

  test('propagates generatePassword errors', () => {
    expect(() => generatePasswords(5, 0, 'abc')).toThrow('Password length must be between 1 and 1000');
  });
});
