import { formatOutput } from '../src/format.js';

describe('formatOutput', () => {
  describe('text format', () => {
    test('formats single password', () => {
      const output = formatOutput(['password1'], 'text');
      expect(output).toBe('password1');
    });

    test('formats multiple passwords with newlines', () => {
      const output = formatOutput(['pass1', 'pass2', 'pass3'], 'text');
      expect(output).toBe('pass1\npass2\npass3');
    });

    test('handles empty array', () => {
      const output = formatOutput([], 'text');
      expect(output).toBe('');
    });
  });

  describe('json format', () => {
    test('formats single password as JSON array', () => {
      const output = formatOutput(['password1'], 'json');
      const parsed = JSON.parse(output);
      expect(parsed).toEqual(['password1']);
    });

    test('formats multiple passwords as JSON array', () => {
      const output = formatOutput(['pass1', 'pass2', 'pass3'], 'json');
      const parsed = JSON.parse(output);
      expect(parsed).toEqual(['pass1', 'pass2', 'pass3']);
    });

    test('formats with indentation', () => {
      const output = formatOutput(['pass1', 'pass2'], 'json');
      expect(output).toContain('\n');
      expect(output).toContain('  ');
    });

    test('handles empty array', () => {
      const output = formatOutput([], 'json');
      const parsed = JSON.parse(output);
      expect(parsed).toEqual([]);
    });
  });

  describe('error handling', () => {
    test('throws on unknown format', () => {
      expect(() => formatOutput(['pass'], 'xml')).toThrow('Unknown output format: xml');
    });

    test('error message lists valid options', () => {
      try {
        formatOutput(['pass'], 'csv');
        fail('Should have thrown');
      } catch (error) {
        expect(error.message).toContain('text');
        expect(error.message).toContain('json');
      }
    });
  });
});
