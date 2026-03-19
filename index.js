#!/usr/bin/env node
'use strict';

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
  matrix-rain - Matrix digital rain effect in your terminal

  Usage:
    matrix-rain [options]

  Options:
    --speed <ms>     Drop speed in ms (default: 80)
    --density <n>    Column density 1-10 (default: 5)
    --color <name>   Color: green, red, blue, cyan, yellow, white (default: green)
    --katakana       Use katakana characters instead of ASCII
    --no-bold        Disable bold leading characters
    -h, --help       Show this help
    -v, --version    Show version

  Press Ctrl+C to exit.
`);
  process.exit(0);
}

if (args.includes('--version') || args.includes('-v')) {
  const pkg = require('./package.json');
  console.log(pkg.version);
  process.exit(0);
}

function getArg(name, fallback) {
  const i = args.indexOf(name);
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
}

const speed = Math.max(10, parseInt(getArg('--speed', '80'), 10) || 80);
const density = Math.min(10, Math.max(1, parseInt(getArg('--density', '5'), 10) || 5));
const colorName = getArg('--color', 'green');
const useKatakana = args.includes('--katakana');
const noBold = args.includes('--no-bold');

const COLORS = {
  green:  { bright: '\x1b[92m', dim: '\x1b[32m', dimmer: '\x1b[2;32m' },
  red:    { bright: '\x1b[91m', dim: '\x1b[31m', dimmer: '\x1b[2;31m' },
  blue:   { bright: '\x1b[94m', dim: '\x1b[34m', dimmer: '\x1b[2;34m' },
  cyan:   { bright: '\x1b[96m', dim: '\x1b[36m', dimmer: '\x1b[2;36m' },
  yellow: { bright: '\x1b[93m', dim: '\x1b[33m', dimmer: '\x1b[2;33m' },
  white:  { bright: '\x1b[97m', dim: '\x1b[37m', dimmer: '\x1b[2;37m' },
};
const color = COLORS[colorName] || COLORS.green;
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const HIDE_CURSOR = '\x1b[?25l';
const SHOW_CURSOR = '\x1b[?25h';

const ASCII_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,.<>?~';
const KATAKANA = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const charset = useKatakana ? KATAKANA : ASCII_CHARS;

function randChar() {
  return charset[Math.floor(Math.random() * charset.length)];
}

let cols, rows;
let columns = [];

function resize() {
  cols = process.stdout.columns || 80;
  rows = process.stdout.rows || 24;
  // Reinit columns
  columns = [];
  for (let x = 0; x < cols; x++) {
    columns.push(newDrop(x, true));
  }
}

function newDrop(x, randomStart) {
  const len = 4 + Math.floor(Math.random() * (rows - 4));
  return {
    x,
    y: randomStart ? -Math.floor(Math.random() * rows * 2) : -len,
    len,
    speed: 0.5 + Math.random() * 1.5,
    acc: 0,
    chars: Array.from({ length: len }, () => randChar()),
  };
}

resize();
process.stdout.on('resize', resize);

// Screen buffer
let screen;

function initScreen() {
  screen = [];
  for (let r = 0; r < rows; r++) {
    screen.push(new Array(cols).fill(' '));
  }
}

function tick() {
  initScreen();

  for (let i = 0; i < cols; i++) {
    // Only use some columns based on density
    if ((i * 7 + 3) % 10 >= density) continue;

    const drop = columns[i];
    if (!drop) continue;

    drop.acc += drop.speed;
    while (drop.acc >= 1) {
      drop.y++;
      drop.acc -= 1;
      // Mutate a random char for flicker
      drop.chars[Math.floor(Math.random() * drop.len)] = randChar();
    }

    // Draw this drop
    for (let j = 0; j < drop.len; j++) {
      const row = Math.floor(drop.y) - j;
      if (row >= 0 && row < rows) {
        screen[row][drop.x] = { char: drop.chars[j], age: j };
      }
    }

    // Reset if fully off screen
    if (Math.floor(drop.y) - drop.len > rows) {
      columns[i] = newDrop(i, false);
    }
  }

  // Render
  let buf = '\x1b[H'; // cursor home
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = screen[r][c];
      if (cell === ' ') {
        buf += ' ';
      } else {
        const { char, age } = cell;
        if (age === 0) {
          buf += (noBold ? '' : BOLD) + '\x1b[97m' + char + RESET;
        } else if (age < 3) {
          buf += color.bright + char + RESET;
        } else if (age < 8) {
          buf += color.dim + char + RESET;
        } else {
          buf += color.dimmer + char + RESET;
        }
      }
    }
    if (r < rows - 1) buf += '\n';
  }

  process.stdout.write(buf);
}

// Graceful exit
function cleanup() {
  process.stdout.write(SHOW_CURSOR + '\x1b[2J\x1b[H' + RESET);
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Start
process.stdout.write(HIDE_CURSOR + '\x1b[2J');
const interval = setInterval(tick, speed);
