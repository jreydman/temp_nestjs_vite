import type { INestApplication } from "@nestjs/common";

export default function setCORS(app: INestApplication, origin: string[]) {
  const hosts = origin.map((host) => new RegExp(host, "i"));

  app.enableCors({
    origin: (origin, callback) => {
      const allow = hosts.some((host) => host.test(origin));

      callback(null, allow);
    },
    credentials: true,
  });
}
