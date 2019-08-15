import { IConfig } from './config.interface';

export const config: IConfig = {
  ENV: 'production',

  APP_HOST: 'api.krauzamiodu.pl',
  APP_PORT: 80,

  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: Number(process.env.DATABASE_PORT),
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD
};
