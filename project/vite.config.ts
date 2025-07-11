import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "./", // ✅ Ensures correct relative paths in production
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'], // ✅ optional if you had issues
  },
  build: {
    outDir: "dist",  // ✅ Required so Vercel knows what to deploy
    emptyOutDir: true
  }
});
