import * as gren from "gren-lang";
import * as path from "node:path";
import * as fs from "node:fs/promises";

const fileRegex = /\.gren$/;

export default function plugin(opts) {
  return {
    name: "vite-plugin-glogg",

    async load(id) {
      if (fileRegex.test(id)) {
        const foundOutline = await findOutline(id);
        const projectDir = foundOutline.projectPath;
        const target = findTarget(id, foundOutline);

        const source = await gren.compileProject(projectDir, {
          target: target,
          sourcemaps: opts.sourcemaps,
          optimize: opts.optimize,
        });

        for (const sourceFile of await findSources(foundOutline)) {
          this.addWatchFile(sourceFile);
        }

        return toESModule(source);
      }
    },
  };
}

async function findOutline(sourceFile) {
  const dirname = path.dirname(sourceFile);
  const potentialOutlinePath = path.join(dirname, "gren.json");

  try {
    const outline = await fs.readFile(potentialOutlinePath, {
      encoding: "utf-8",
    });

    return {
      projectPath: dirname,
      contents: JSON.parse(outline),
    };
  } catch (err) {
    if (err.code === "ENOENT") {
      return await findOutline(dirname);
    }

    throw err;
  }
}

function findTarget(id, outline) {
  const potentialTargets = outline.contents["source-directories"]
    .map((srcDir) => {
      const root = path.join(outline.projectPath, srcDir);
      return path.relative(root, id).replace(/\.gren$/, "");
    })
    .filter((relative) => {
      return !relative.includes(".");
    })
    .map((target) => {
      return target.replace("/", ".");
    });

  if (potentialTargets.length === 0 || potentialTargets.length > 1) {
    return new Error(
      "Ambigious entrypoint. Unable to determine module name for: " + id,
    );
  }

  return potentialTargets[0];
}

async function findSources(foundOutline) {
  const projectPath = foundOutline.projectPath;
  const sources = [path.join(projectPath, "gren.json")];

  const srcDirs = foundOutline.contents["source-directories"];
  for (const srcDir of srcDirs) {
    const srcRoot = path.join(projectPath, srcDir);
    const files = await fs.readdir(srcRoot, { recursive: true });

    for (const file of files) {
      if (fileRegex.test(file)) {
        sources.push(path.join(srcRoot, file));
      }
    }
  }

  return sources;
}

// From elm-asm
function toESModule(js) {
  const exports = js.match(/^\s*_Platform_export\(([^]*)\);\n?}\([^]*\);/m)[1];

  return js
    .replace(/\(function\s*\(scope\)\s*\{$/m, "// -- $&")
    .replace(/['"]use strict['"];$/m, "// -- $&")
    .replace(/function _Platform_export([^]*?)\}\n/g, "/*\n$&\n*/")
    .replace(/function _Platform_mergeExports([^]*?)\}\n\s*}/g, "/*\n$&\n*/")
    .replace(/^\s*_Platform_export\(([^]*)\);\n?}\([^]*\);/m, "/*\n$&\n*/")
    .replaceAll(/var (\S*) = (F[2-9])/g, "var $1 = /* @__PURE__ */ $2").concat(`
export const Gren = ${exports};
  `);
}
