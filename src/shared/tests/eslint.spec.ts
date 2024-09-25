describe("E2E volume", function () {
  beforeAll(async () => {
    // const { Console } = await import("node:console");
    // globalThis.console = new Console(process.stdout, process.stderr);
  });

  it("eslint character | check plugins", async () => {
    const eslint = await import("eslint");
    const tslint = await import("typescript-eslint");
    const nestjsTypedPlugin = await import(
      "@darraghor/eslint-plugin-nestjs-typed"
    );
    const prettierConfig = await import("eslint-config-prettier");
    const prettierPlugin = await import("eslint-plugin-prettier/recommended");

    console.log(prettierPlugin);
  });
});
