#!/usr/bin/env node

import { Command } from 'commander';
import { getCharset } from './charsets.js';
import { generatePasswords } from './generate.js';
import { formatOutput } from './format.js';

const program = new Command();

program
  .name('passgen')
  .description('Generate cryptographically secure random passwords')
  .version('1.0.0')
  .option('-l, --length <number>', 'password length (1-1000)', '16')
  .option('-c, --charset <name>', 'character set (alphanumeric, alphanumeric-symbols, custom)', 'alphanumeric-symbols')
  .option('--custom <chars>', 'custom character set (required if --charset custom)')
  .option('-n, --count <number>', 'number of passwords to generate (1-1000)', '1')
  .option('-o, --output <format>', 'output format (text, json)', 'text');

program.action((options) => {
  try {
    // Parse and validate length
    const length = parseInt(options.length, 10);
    if (isNaN(length)) {
      console.error('Error: length must be a number');
      process.exit(1);
    }

    // Parse and validate count
    const count = parseInt(options.count, 10);
    if (isNaN(count)) {
      console.error('Error: count must be a number');
      process.exit(1);
    }

    // Get character set
    const charset = getCharset(options.charset, options.custom);

    // Generate passwords
    const passwords = generatePasswords(count, length, charset);

    // Format and output
    const output = formatOutput(passwords, options.output);
    console.log(output);

    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
});

// Handle crypto errors specially
process.on('uncaughtException', (error) => {
  if (error.message.includes('crypto') || error.message.includes('random')) {
    console.error('Error: Cryptographic system failure');
    process.exit(2);
  }
  console.error(`Error: ${error.message}`);
  process.exit(1);
});

program.parse();
