import crypto from 'crypto';

/**
 * Generate a cryptographically secure random password
 * @param {number} length - Length of password (1-1000)
 * @param {string} charset - Character set to use
 * @returns {string} Generated password
 * @throws {Error} If length is out of range or charset is empty
 */
export function generatePassword(length, charset) {
  if (length < 1 || length > 1000) {
    throw new Error('Password length must be between 1 and 1000');
  }

  if (!charset || charset.length === 0) {
    throw new Error('Character set cannot be empty');
  }

  const charsetLength = charset.length;
  const password = [];

  // Use rejection sampling to ensure uniform distribution
  // Calculate the maximum valid random value to avoid modulo bias
  const maxValidValue = Math.floor(256 / charsetLength) * charsetLength;

  while (password.length < length) {
    // Generate random bytes
    const randomBytes = new Uint8Array(length - password.length);
    crypto.getRandomValues(randomBytes);

    // Convert bytes to characters, rejecting biased values
    for (let i = 0; i < randomBytes.length && password.length < length; i++) {
      const randomByte = randomBytes[i];

      // Reject values that would create modulo bias
      if (randomByte < maxValidValue) {
        const charIndex = randomByte % charsetLength;
        password.push(charset[charIndex]);
      }
    }
  }

  return password.join('');
}

/**
 * Generate multiple passwords
 * @param {number} count - Number of passwords to generate (1-1000)
 * @param {number} length - Length of each password
 * @param {string} charset - Character set to use
 * @returns {string[]} Array of generated passwords
 * @throws {Error} If count is out of range
 */
export function generatePasswords(count, length, charset) {
  if (count < 1 || count > 1000) {
    throw new Error('Password count must be between 1 and 1000');
  }

  const passwords = [];
  for (let i = 0; i < count; i++) {
    passwords.push(generatePassword(length, charset));
  }

  return passwords;
}
