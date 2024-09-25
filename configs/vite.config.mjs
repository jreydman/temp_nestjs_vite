import path from "node:path";
/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";

const rootPath = path.resolve(path.dirname(import.meta.dirname));
const srcPath = path.resolve(rootPath, "src");
const appEntrypointPath = path.resolve(srcPath, "app.ts");

const config = defineConfig({
  test: {
    globals: true,
    coverage: {
      reportsDirectory: "documentation/generated/coverage",
    },
  },
  server: {
    host: String(process.env.BACKEND_SERVICE_HOST ?? "localhost"),
    port: Number.parseInt(process.env.BACKEND_SERVICE_PORT ?? "3000"),
    hmr: true,
    watch: { usePolling: true },
  },
  resolve: {
    alias: {
      src: srcPath,
    },
  },
  plugins: [
    ...VitePluginNode({
      adapter: "nest",
      appPath: appEntrypointPath,
      exportName: "viteNodeApp",
      tsCompiler: "swc",
      swcOptions: {
        sourceMaps: true,
        module: {
          type: "nodenext",
        },
        jsc: {
          target: "esnext",
          parser: {
            syntax: "typescript",
            decorators: true,
            dynamicImport: true,
          },
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
          },
          keepClassNames: true,
        },
        minify: false,
      },
    }),
  ],
  optimizeDeps: {
    exclude: [
      "@nestjs/platform-socket.io",
      "@nestjs/websockets",
      "@nestjs/microservices",
      "amqp-connection-manager",
      "amqplib",
      "nats",
      "@grpc/proto-loader",
      "@grpc/grpc-js",
      "redis",
      "kafkajs",
      "mqtt",
      "cache-manager",
    ],
  },
});

export default config;
