import { readFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const colourSystem = readFileSync('colour-system.html', 'utf8');
const cname = readFileSync('CNAME', 'utf8').trim();
const tokens = JSON.parse(readFileSync('assets/tokens.json', 'utf8'));
const errors = [];

const requireText = (document, value, description) => {
  if (!document.includes(value)) errors.push(`Missing ${description}: ${value}`);
};

if (cname !== 'brand.skunkworksacademy.com') {
  errors.push(`CNAME must be brand.skunkworksacademy.com, received: ${cname}`);
}

for (const [value, description] of [
  ['https://brand.skunkworksacademy.com/', 'canonical URL'],
  ['https://www.skunkworksacademy.com/', 'Academy home integration'],
  ['https://portal.skunkworksacademy.com/', 'portal sign-in integration'],
  ['assets/tokens.json', 'design-token integration'],
  ['display=swap', 'non-blocking web-font loading'],
  [':focus-visible', 'visible keyboard focus'],
  ['prefers-reduced-motion', 'reduced-motion support'],
  ['prefers-color-scheme: dark', 'dark-mode support'],
  ['min-height: 44px', 'minimum touch target'],
  ['aria-expanded', 'mobile navigation state'],
  ['aria-controls="nav"', 'mobile navigation relationship']
]) requireText(html, value, description);

for (const section of ['foundations', 'logo', 'digital', 'social', 'cobranding', 'terms', 'governance']) {
  requireText(html, `id="${section}"`, `${section} section`);
  requireText(html, `href="#${section}"`, `${section} navigation target`);
}

for (const [value, description] of [
  ['#03033A', 'Ink Navy'],
  ['#1E6BD0', 'Skunk Blue'],
  ['#F24208', 'Signal Orange'],
  ['#FFFFFF', 'White'],
  ['#F7F9FC', 'Off White'],
  ['#15171A', 'Graphite'],
  ['#D8DEE8', 'Steel Gray'],
  ['#5A6472', 'Slate Text'],
  ['70%', '70 percent usage ratio'],
  ['20%', '20 percent usage ratio'],
  ['8%', '8 percent usage ratio'],
  ['2%', '2 percent usage ratio']
]) requireText(colourSystem, value, description);

if (/\becosystem\b/i.test(html) || /\becosystem\b/i.test(colourSystem)) {
  errors.push('Disallowed term "ecosystem" found in brand portal content');
}

const hexToRgb = hex => {
  const value = hex.replace('#', '');
  if (!/^[0-9a-f]{6}$/i.test(value)) throw new Error(`Invalid HEX colour: ${hex}`);
  return [0, 2, 4].map(offset => Number.parseInt(value.slice(offset, offset + 2), 16));
};

const expectedCore = {
  'ink-navy': { hex: '#03033A', rgb: [3, 3, 58] },
  'skunk-blue': { hex: '#1E6BD0', rgb: [30, 107, 208] },
  'signal-orange': { hex: '#F24208', rgb: [242, 66, 8] },
  white: { hex: '#FFFFFF', rgb: [255, 255, 255] }
};

for (const [name, expected] of Object.entries(expectedCore)) {
  const actual = tokens.palette?.core?.[name];
  if (!actual) {
    errors.push(`Missing core palette token: ${name}`);
    continue;
  }
  if (actual.hex.toUpperCase() !== expected.hex) {
    errors.push(`${name} must be ${expected.hex}, received ${actual.hex}`);
  }
  if (JSON.stringify(actual.rgb) !== JSON.stringify(expected.rgb)) {
    errors.push(`${name} RGB must be ${expected.rgb.join(', ')}, received ${actual.rgb?.join(', ')}`);
  }
}

const usageRatio = tokens.palette?.['usage-ratio'] ?? {};
const ratioTotal = Object.values(usageRatio).reduce((sum, value) => sum + Number(value || 0), 0);
if (ratioTotal !== 100) {
  errors.push(`Colour usage ratio must total 100, received ${ratioTotal}`);
}

const expectedRatio = {
  'white-off-white': 70,
  'ink-graphite': 20,
  'skunk-blue': 8,
  'signal-orange': 2
};
for (const [name, value] of Object.entries(expectedRatio)) {
  if (usageRatio[name] !== value) {
    errors.push(`${name} usage ratio must be ${value}, received ${usageRatio[name]}`);
  }
}

const channel = value => {
  const normalized = value / 255;
  return normalized <= 0.04045
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
};

const luminance = hex => {
  const [r, g, b] = hexToRgb(hex).map(channel);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrast = (foreground, background) => {
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
};

const minimum = tokens.accessibility['minimum-normal-text-contrast'];
const pairs = [
  ['graphite', tokens.color.graphite, tokens.color.white],
  ['slate on white', tokens.color['slate-text'], tokens.color.white],
  ['white on Skunk Blue', tokens.color.white, tokens.color['skunk-blue']],
  ['blue-on-dark on Ink Navy', tokens.color['blue-on-dark'], tokens.color['ink-navy']],
  ['dark text on dark surface', tokens.color['dark-text'], tokens.color['dark-surface']],
  ['dark muted on Ink Navy', tokens.color['dark-muted'], tokens.color['ink-navy']]
];

for (const [name, foreground, background] of pairs) {
  const ratio = contrast(foreground, background);
  if (ratio < minimum) {
    errors.push(`${name} contrast ${ratio.toFixed(2)}:1 is below ${minimum}:1`);
  } else {
    console.log(`PASS ${name}: ${ratio.toFixed(2)}:1`);
  }
}

if (tokens.size['touch-target'] < 44) {
  errors.push('Touch target token must be at least 44px');
}

if (errors.length) {
  console.error('\nBrand portal validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('\nBrand portal integration, colour-system and accessibility validation passed.');