import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    // deno: true,
  },
  package: {
    // package.json properties
    name: "@jongood01/finance-data-lib",
    version: Deno.args[0],
    description: "A shared data library for the Pocket finance app.",
    license: "MIT",
    repository: {
      type: "git",
      url: "https://github.com/jongood01/finance-data-lib",
    },
    scripts: {
      "artifactregistry-login": "npx google-artifactregistry-auth",
    },
    // bugs: {
    //   url: "https://github.com/username/repo/issues",
    // },
  },
  postBuild() {
    // steps to run after building and before running the tests
    // Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync(".npmrc", "npm/.npmrc");
  },
});
