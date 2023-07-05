import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/music-box/',
  plugins: [react(), tsconfigPaths()],
  server: {
    cors: false,
  },
})
