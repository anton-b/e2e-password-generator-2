// Character set definitions for password generation

export const CHARSETS = {
  alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  'alphanumeric-symbols': 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
};

/**
 * Get character set by name or custom string
 * @param {string} name - Charset name or 'custom'
 * @param {string} [custom] - Custom character string (required if name is 'custom')
 * @returns {string} Character set string
 * @throws {Error} If charset name is invalid or custom is missing
 */
export function getCharset(name, custom) {
  if (name === 'custom') {
    if (!custom || custom.length === 0) {
      throw new Error('Custom charset cannot be empty');
    }
    return custom;
  }

  if (!CHARSETS[name]) {
    throw new Error(`Unknown charset: ${name}. Valid options: ${Object.keys(CHARSETS).join(', ')}, custom`);
  }

  return CHARSETS[name];
}
