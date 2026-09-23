import { getCharset, CHARSETS } from '../src/charsets.js';

describe('CHARSETS', () => {
  test('defines alphanumeric charset', () => {
    expect(CHARSETS.alphanumeric).toBeDefined();
    expect(CHARSETS.alphanumeric).toMatch(/^[A-Za-z0-9]+$/);
  });

  test('defines alphanumeric-symbols charset', () => {
    expect(CHARSETS['alphanumeric-symbols']).toBeDefined();
    expect(CHARSETS['alphanumeric-symbols']).toContain('A');
    expect(CHARSETS['alphanumeric-symbols']).toContain('!');
  });

  test('alphanumeric contains 62 characters', () => {
    // 26 uppercase + 26 lowercase + 10 digits
    expect(CHARSETS.alphanumeric).toHaveLength(62);
  });
});

describe('getCharset', () => {
  test('returns alphanumeric charset', () => {
    const charset = getCharset('alphanumeric');
    expect(charset).toBe(CHARSETS.alphanumeric);
  });

  test('returns alphanumeric-symbols charset', () => {
    const charset = getCharset('alphanumeric-symbols');
    expect(charset).toBe(CHARSETS['alphanumeric-symbols']);
  });

  test('returns custom charset when name is "custom"', () => {
    const custom = 'abc123!@#';
    const charset = getCharset('custom', custom);
    expect(charset).toBe(custom);
  });

  test('throws on unknown charset name', () => {
    expect(() => getCharset('unknown')).toThrow('Unknown charset: unknown');
  });

  test('throws when custom charset is empty', () => {
    expect(() => getCharset('custom', '')).toThrow('Custom charset cannot be empty');
  });

  test('throws when custom charset is missing', () => {
    expect(() => getCharset('custom')).toThrow('Custom charset cannot be empty');
  });

  test('error message lists valid options', () => {
    try {
      getCharset('invalid');
      fail('Should have thrown');
    } catch (error) {
      expect(error.message).toContain('alphanumeric');
      expect(error.message).toContain('custom');
    }
  });
});
