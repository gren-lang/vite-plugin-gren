import * as gren from "gren-lang";

const fileRegex = /\.gren$/;

export default function plugin() {
  return {
    name: "vite-plugin-glogg",

    async load(id) {
      if (fileRegex.test(id)) {
        return await gren.compileProject(id);
      }
    },
  };
}
