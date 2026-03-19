# matrix-rain-cli

[![npm version](https://img.shields.io/npm/v/@kszongic/matrix-rain-cli.svg)](https://www.npmjs.com/package/@kszongic/matrix-rain-cli)
[![npm downloads](https://img.shields.io/npm/dm/@kszongic/matrix-rain-cli.svg)](https://www.npmjs.com/package/@kszongic/matrix-rain-cli)
[![license](https://img.shields.io/npm/l/@kszongic/matrix-rain-cli.svg)](LICENSE)
![node](https://img.shields.io/node/v/@kszongic/matrix-rain-cli.svg)
![zero deps](https://img.shields.io/badge/dependencies-0-brightgreen)
![cross-platform](https://img.shields.io/badge/platform-win%20%7C%20mac%20%7C%20linux-blue)

**Matrix digital rain effect in your terminal. Zero dependencies.**

```
  ｦ       ﾀ           ﾐ   ﾑ
  ﾇ   4   ﾊ       7   ﾓ   ﾔ
  ﾜ   ﾝ   ﾙ   ﾘ   ﾗ   ﾖ   ﾕ
  3   ﾊ   8   ﾆ   ﾅ   ﾄ   ﾃ
  ﾂ   ﾁ   0   ﾀ   ｿ   ｾ   ｽ
```

> *"Unfortunately, no one can be told what the Matrix is. You have to see it for yourself."*

## Why?

- 🎬 **Impress people** — instant hacker aesthetic in any terminal
- 🧘 **Focus mode** — mesmerizing background for deep work or presentations
- 🎭 **Screen recordings** — perfect animated backdrop for demos and talks
- 📦 **Zero dependencies** — installs in under a second
- 🎨 **Customizable** — speed, density, color, and character set

## Install

```bash
npm install -g @kszongic/matrix-rain-cli
```

Or try it instantly with npx:

```bash
npx @kszongic/matrix-rain-cli
```

## Usage

```bash
matrix-rain
```

Press `Ctrl+C` to exit.

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--speed <ms>` | Drop speed in milliseconds | `80` |
| `--density <n>` | Column density (1-10) | `5` |
| `--color <name>` | green, red, blue, cyan, yellow, white | `green` |
| `--katakana` | Use katakana characters (like the movie!) | off |
| `--no-bold` | Disable bold leading characters | off |

## Recipes

```bash
# Classic green rain
matrix-rain

# Fast red rain — Morpheus mode
matrix-rain --speed 40 --color red

# Dense katakana rain — movie-accurate
matrix-rain --density 8 --katakana

# Slow cyan rain — chill vibes
matrix-rain --speed 150 --color cyan --density 3

# Background for screen recording
matrix-rain --katakana --color green --density 7 &

# Combine with tmux for a sidebar effect
tmux split-window -h 'matrix-rain --katakana --density 6'
```

## Use Cases

- **Presentations** — run it in a split terminal while presenting code
- **Streaming/recording** — animated background for developer content
- **Screensaver** — leave it running when you step away
- **Pair programming** — set the mood for a late-night debugging session
- **Conference booths** — instant attention grabber on a big screen

## Comparison

| Tool | Zero deps | Customizable | Katakana | Cross-platform | npm install |
|------|-----------|-------------|----------|---------------|-------------|
| **matrix-rain-cli** | ✅ | ✅ speed/density/color | ✅ | ✅ | ✅ |
| cmatrix (C) | ✅ | ✅ | ✅ | ❌ Linux only | ❌ apt/brew |
| neo (Rust) | ✅ | ✅ | ✅ | ⚠️ limited | ❌ cargo |
| unimatrix (Python) | ✅ | ✅ | ✅ | ⚠️ needs Python | ❌ pip |

**Why this one?** If you already have Node.js, you're one `npx` command away. No compilation, no system packages, works everywhere Node runs.

## How It Works

The animation divides your terminal into columns. Each column has a "drop" that falls at a randomized pace. Characters are randomly chosen from ASCII digits and (optionally) half-width katakana. The leading character renders in bold for that classic bright-head-dim-tail look. The density flag controls how many columns are active simultaneously.

## Related Tools

Other zero-dep CLI tools from [@kszongic](https://github.com/kszongic):

- [**bar-chart-cli**](https://github.com/kszongic/bar-chart-cli) — ASCII bar charts in your terminal
- [**sierpinski-cli**](https://github.com/kszongic/sierpinski-cli) — Sierpinski triangle fractal art
- [**maze-gen-cli**](https://github.com/kszongic/maze-gen-cli) — Generate and solve terminal mazes
- [**pomodoro-cli**](https://github.com/kszongic/pomodoro-cli) — Pomodoro timer for the terminal

## License

MIT © [kszongic](https://github.com/kszongic)
