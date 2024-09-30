import type { AbstractHttpAdapter } from "@nestjs/core";

export default function setCORS(adapter: AbstractHttpAdapter) {
  adapter.enableCors({
    origin: (origin, callback) => {
      callback(null, ["*"]);
    },
    methods: ["GET", "POST"],
    exposedHeaders: "Authorization",
    credentials: true,
  });
}
