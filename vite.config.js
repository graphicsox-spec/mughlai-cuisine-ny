import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Supports both root domain deployments (Vercel, Netlify, custom domain)
// and GitHub Pages subpath deployment (/mughlai-cuisine-ny/)
const basePath = process.env.GITHUB_PAGES ? '/mughlai-cuisine-ny/' : './';

function rewriteAssetPathsPlugin(base) {
  if (base === './' || base === '/') return null;
  return {
    name: 'rewrite-asset-paths',
    transform(code, id) {
      if (id.includes('src') && (id.endsWith('.js') || id.endsWith('.jsx'))) {
        return {
          code: code.replace(/(['"])\/(images|brand)\//g, `$1${base}$2/`),
          map: null
        };
      }
    }
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    rewriteAssetPathsPlugin(basePath)
  ].filter(Boolean),
  server: {
    port: 3000,
    open: false
  },
  build: {
    emptyOutDir: false
  }
});
