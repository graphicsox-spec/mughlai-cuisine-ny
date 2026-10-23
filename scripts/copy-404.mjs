import { copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';

try {
  await copyFile(resolve('dist/index.html'), resolve('dist/404.html'));
  console.log('GitHub Pages 404 fallback created: dist/404.html');
} catch (error) {
  console.error('Failed to copy 404.html:', error);
}
