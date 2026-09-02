import { defineConfig } from 'vite';
import { ydom } from 'ydom-core/vite-plugin';

export default defineConfig({
  plugins: [ydom()],
});
