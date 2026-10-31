import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    noDiscovery: true,
    include: [
      'axios',
      'date-fns',
      'prop-types',
      'react',
      'react-dom/client',
      'react-icons/md',
      'react-paginate',
      'react-router-dom',
    ],
  },
  plugins: [
    react({
      plugins: [],
      parserConfig(id) {
        if (id.includes('/src/') && id.endsWith('.js')) {
          return { syntax: 'ecmascript', jsx: true };
        }
      },
    }),
  ],
});