import { ROCESS_ENV_KEYS } from "./config.definition";

declare global {
  declare namespace NodeJS {
    type _ProcessEnvKeys = keyof typeof PROCESS_ENV_KEYS;

    type _ProcessEnvFields = {
      [key in _ProcessEnvKeys]: string | undefined;
    };

    export interface ProcessEnv extends _ProcessEnvFields {}
  }
}

export {};
