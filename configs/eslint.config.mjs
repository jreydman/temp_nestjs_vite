import nestjsTypedPlugin from "@darraghor/eslint-plugin-nestjs-typed";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import pluginPromise from "eslint-plugin-promise";
import path from "node:path";
import url from "node:url";
import typescriptEslint from "typescript-eslint";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.resolve(path.dirname(__dirname));
const tsconfigPath = path.resolve(rootPath, "configs", "typescript.config.json");

const defaultIgnoresPool = ["**/node_modules/**/*", "**/.git/**/*", "**/generated/**/*"];

/** @type {import("eslint").Linter.Config[]} */
const config = [
  //----------------------------------------------------------------------
  ...[typescriptEslint.configs.recommendedTypeChecked[1], typescriptEslint.configs.recommendedTypeChecked[2]].map(
    (config) => ({
      ...config,
      languageOptions: {
        parser: typescriptEslint.parser,
        parserOptions: {
          sourceType: "module",
          tsconfigRootDir: rootPath,
          project: tsconfigPath,
          // projectService: true,
        },
      },
      plugins: {
        "@typescript-eslint": typescriptEslint.plugin,
      },
      rules: {
        "no-unused-vars": "off",
      },
      files: ["**/*.{ts,mts}"], // use TS config only for TS files
      ignores: [...defaultIgnoresPool],
    }),
  ),
  //----------------------------------------------------------------------
  {
    ...typescriptEslint.configs.stylisticTypeChecked[2],
    languageOptions: {
      parser: typescriptEslint.parser,
      parserOptions: {
        sourceType: "module",
        tsconfigRootDir: rootPath,
        project: tsconfigPath,
        projectService: true,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint.plugin,
    },
    rules: {
      "no-empty-function": "off",
    },
    files: ["**/*.{ts,mts}"], // use TS config only for TS files
    ignores: [...defaultIgnoresPool],
  },
  //----------------------------------------------------------------------
  // {
  //   ...prettierPlugin,
  //   name: "prettier/recommended",
  //   ignores: [...defaultIgnoresPool],
  // },
  //----------------------------------------------------------------------
  {
    ...pluginPromise.configs["flat/recommended"],
    name: "promise/recommended",
    languageOptions: {
      parser: typescriptEslint.parser,
      parserOptions: {
        sourceType: "module",
        tsconfigRootDir: rootPath,
        project: tsconfigPath,
        projectService: true,
      },
    },
    files: ["**/*.{js,mjs,cjs,ts,mts}"],
    ignores: [...defaultIgnoresPool],
  },
  //----------------------------------------------------------------------
  {
    name: "nestjs-typed/recommended",
    languageOptions: {
      parser: typescriptEslint.parser,
      parserOptions: {
        sourceType: "module",
        tsconfigRootDir: rootPath,
        project: tsconfigPath,
        projectService: true,
      },
    },
    plugins: {
      "@darraghor/nestjs-typed": nestjsTypedPlugin,
    },
    files: ["src/**/*.{js,mjs,cjs,ts,mts}"],
    ignores: [...defaultIgnoresPool],
    rules: {
      // use nestjs-typed rules from recommended config without unworked in v9 rules
      ...Object.fromEntries(
        Object.entries(nestjsTypedPlugin.configs.recommended.rules).filter(
          ([key, _value]) => !["@darraghor/nestjs-typed/injectable-should-be-provided"].includes(key),
        ),
      ),
    },
  },
  //----------------------------------------------------------------------
];

export default config;
