import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const inputDir = path.join(root, 'src/assets/mundial2026');

const files = fs.readdirSync(inputDir).filter((f) => f.endsWith('.png'));

for (const file of files) {
  const input = path.join(inputDir, file);
  const output = path.join(inputDir, file.replace('.png', '.webp'));
  if (!fs.existsSync(output) || fs.statSync(input).mtimeMs > fs.statSync(output).mtimeMs) {
    await sharp(input).webp({ quality: 88, effort: 6, smartSubsample: true }).toFile(output);
    console.log('Converted', file);
  }
}

const logoIn = path.join(root, 'src/assets/mundial_2026.png');
await sharp(logoIn).webp({ quality: 90, effort: 6 }).toFile(path.join(root, 'src/assets/mundial_2026.webp'));

for (const size of [16, 32, 180, 512]) {
  const out =
    size === 180
      ? path.join(root, 'public/apple-touch-icon.png')
      : size === 512
        ? path.join(root, 'public/favicon.png')
        : path.join(root, `public/favicon-${size}.png`);
  await sharp(logoIn)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(out);
}
await sharp(logoIn).webp({ quality: 90 }).toFile(path.join(root, 'public/favicon.webp'));

console.log('Done.');
