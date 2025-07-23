import gren from 'vite-plugin-gren'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    gren({
      sourcemaps: true,
      optimize: true
    }),
  ],
})
