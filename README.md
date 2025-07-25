# vite-plugin-gren

Vite plugin for the Gren programming language.

## Getting started

Install using `npm install --save-dev vite-plugin-gren`.

A minimal `vite.config.js` configuration is as follows:

```
import gren from "vite-plugin-gren";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    gren({
      // Generate sourcemaps, default: true
      // Allows you to view Gren source code in the browser's dev tools
      // Increases compile time
      sourcemaps: true, 
      // Generate optimized JavaScript, default: false
      // Setting this to false makes the generated JS more readable, and allows usage
      // of the Debug module
      // Should be enabled for production builds
      optimize: false,
    }),
  ],
});
```

See the [example](https://github.com/gren-lang/vite-plugin-gren/tree/main/example) for a minimal example.
