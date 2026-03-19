# matrix-rain-cli

[![npm version](https://img.shields.io/npm/v/@kszongic/matrix-rain-cli.svg)](https://www.npmjs.com/package/@kszongic/matrix-rain-cli)
[![license](https://img.shields.io/npm/l/@kszongic/matrix-rain-cli.svg)](LICENSE)

Matrix digital rain effect in your terminal. Zero dependencies.

![Matrix Rain](https://img.shields.io/badge/terminal-🟢%20rain-green)

## Install

```bash
npm install -g @kszongic/matrix-rain-cli
```

## Usage

```bash
matrix-rain
```

Press `Ctrl+C` to exit.

### Options

| Flag | Description | Default |
|------|-------------|---------|
| `--speed <ms>` | Drop speed in milliseconds | `80` |
| `--density <n>` | Column density 1-10 | `5` |
| `--color <name>` | green, red, blue, cyan, yellow, white | `green` |
| `--katakana` | Use katakana characters | off |
| `--no-bold` | Disable bold leading characters | off |

### Examples

```bash
# Classic green rain
matrix-rain

# Fast red rain
matrix-rain --speed 40 --color red

# Dense katakana rain
matrix-rain --density 8 --katakana

# Slow cyan rain
matrix-rain --speed 150 --color cyan --density 3
```

## License

MIT © [kszongic](https://github.com/kszongic)
