import { IConfig } from './config.interface';

export const config: IConfig = {
  ENV: 'test',

  APP_HOST: 'api.krauzamiodu.test',
  APP_PORT: 3000,

  JWT_SECRET: 'secret',

  DATABASE_HOST: 'localhost',
  DATABASE_PORT: 3306,
  DATABASE_NAME: 'krauzamiodu_test',
  DATABASE_USER: 'krauzamiodu_test',
  DATABASE_PASSWORD: 'qwerty'
};
