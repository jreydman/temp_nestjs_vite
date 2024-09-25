/**
 * @type {import("prettier").Config}
 */
const config = {
  printWidth: 80,
  semi: true,
  tabWidth: 2,
  trailingComma: "all",

  plugins: [
    "prettier-plugin-embed",
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-prisma",
  ],

  //* @trivago/prettier-plugin-sort-imports
  importOrder: ["<THIRD_PARTY_MODULES>", "^[src/]", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
  importOrderParserPlugins: ["decorators-legacy", "typescript"],
};

export default config;
