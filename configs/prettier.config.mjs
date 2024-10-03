/**
 * @type {import("prettier").Config & import("@trivago/prettier-plugin-sort-imports").PrettierConfig}
 */
const config = {
  printWidth: 120,
  semi: true,
  tabWidth: 2,
  trailingComma: "all",

  plugins: [
    "prettier-plugin-embed",
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-prisma",
    "prettier-plugin-sh",
  ],

  overrides: [
    {
      files: ["**/.husky/{pre,post}-*", "**/.husky/{pre,post}-*.{sh,bash}"],
      options: { parser: "sh" },
    },
  ],

  //* @trivago/prettier-plugin-sort-imports
  importOrder: ["<THIRD_PARTY_MODULES>", "^[src/]", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
  importOrderParserPlugins: ["decorators-legacy", "typescript"],
};

export default config;
