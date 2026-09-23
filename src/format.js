/**
 * Format passwords for output
 * @param {string[]} passwords - Array of passwords
 * @param {string} format - Output format ('text' or 'json')
 * @returns {string} Formatted output
 * @throws {Error} If format is invalid
 */
export function formatOutput(passwords, format) {
  if (format === 'text') {
    return passwords.join('\n');
  }

  if (format === 'json') {
    return JSON.stringify(passwords, null, 2);
  }

  throw new Error(`Unknown output format: ${format}. Valid options: text, json`);
}
