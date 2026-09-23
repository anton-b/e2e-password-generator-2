# passgen

Cryptographically secure CLI password generator with configurable options.

## Features

- 🔒 Cryptographically secure random generation using `crypto.getRandomValues`
- ⚙️ Configurable length, character sets, and output formats
- 📦 Zero dependencies for core functionality (Commander.js for CLI only)
- 🚀 Fast and lightweight
- 🧪 Comprehensive test coverage
- 🌐 Works offline

## Installation

```bash
npm install -g passgen
```

Or use directly with npx:

```bash
npx passgen
```

## Usage

### Basic usage

Generate a single 16-character password (default):

```bash
passgen
```

### Custom length

```bash
passgen --length 32
```

### Character sets

**Alphanumeric** (A-Z, a-z, 0-9):

```bash
passgen --charset alphanumeric
```

**Alphanumeric with symbols** (default):

```bash
passgen --charset alphanumeric-symbols
```

**Custom character set**:

```bash
passgen --charset custom --custom "abc123!@#"
```

### Generate multiple passwords

```bash
passgen --count 10
```

### Output formats

**Text** (one per line, default):

```bash
passgen --count 5
```

**JSON**:

```bash
passgen --count 5 --output json
```

### Combined example

```bash
passgen --length 20 --charset alphanumeric --count 10 --output json
```

## Options

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `--length <number>` | `-l` | Password length (1-1000) | 16 |
| `--charset <name>` | `-c` | Character set (`alphanumeric`, `alphanumeric-symbols`, `custom`) | `alphanumeric-symbols` |
| `--custom <chars>` | | Custom character set (required if `--charset custom`) | |
| `--count <number>` | `-n` | Number of passwords to generate (1-1000) | 1 |
| `--output <format>` | `-o` | Output format (`text`, `json`) | `text` |
| `--version` | `-V` | Display version | |
| `--help` | `-h` | Display help | |

## Exit Codes

- `0` - Success
- `1` - Invalid arguments or general error
- `2` - Cryptographic system failure

## Programmatic API

You can also use passgen as a library:

```javascript
import { generatePassword, generatePasswords, CHARSETS } from 'passgen';

// Generate a single password
const password = generatePassword(16, CHARSETS.alphanumeric);

// Generate multiple passwords
const passwords = generatePasswords(10, 20, CHARSETS['alphanumeric-symbols']);
```

## Development

### Install dependencies

```bash
npm install
```

### Run tests

```bash
npm test
```

### Run tests in watch mode

```bash
npm run test:watch
```

## Security

This tool uses `crypto.getRandomValues()` which is backed by:
- `/dev/urandom` on Unix/Linux
- `BCryptGenRandom` on Windows

These are cryptographically secure PRNGs suitable for password generation. The implementation uses rejection sampling to ensure uniform distribution across the character set, avoiding modulo bias.

## License

MIT

## Author

Anton Benkevich
