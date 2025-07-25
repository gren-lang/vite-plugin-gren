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
      sourcemaps: true, // Gren sources in the browser's devtools
      optimize: false, // Allows usage of Debug module, disable for production builds
    }),
  ],
});
```

See the [example](https://github.com/gren-lang/vite-plugin-gren/tree/main/example) for a minimal example.
