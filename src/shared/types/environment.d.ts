declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // # PROJECT
      NODE_ENV: "development" | "production" | "test";
      // # BACKEND
      BACKEND_SERVICE_HOST: string | undefined;
      BACKEND_SERVICE_PORT: string | undefined;
      BACKEND_API_VERSION: string | undefined;
      BACKEND_API_PREFIX: string | undefined;
      // # CREDENTIALS
      JWT_ACCESS_SECRET_KEY: string | undefined;
      JWT_ACCESS_SECRET_EXPIRATION_TIME: string | undefined;
      JWT_REFRESH_SECRET_KEY: string | undefined;
      JWT_REFRESH_SECRET_EXPIRATION_TIME: string | undefined;
      // # DATABASE
      DATABASE_SERVICE_HOST: string | undefined;
      DATABASE_SERVICE_PORT: string | undefined;
      DATABASE_PROVIDER: string | undefined;
      DATABASE_USERNAME: string | undefined;
      DATABASE_PASSWORD: string | undefined;
      DATABASE_NAME: string | undefined;
      DATABASE_URL: string | undefined;
    }
  }
}
export {};
