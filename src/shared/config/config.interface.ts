export type Env = 'production' | 'development' | 'test';

export interface IConfig {
  ENV: Env;

  APP_HOST: string;
  APP_PORT: number;

  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;

  JWT_SECRET: string;

  isDevEnvironment?: () => boolean;
  isProdEnvironment?: () => boolean;
  isTestEnvironment?: () => boolean;
}
