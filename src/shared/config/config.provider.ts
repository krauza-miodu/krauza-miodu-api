import { config as configDev } from './development-config';
import { config as configProd } from './production-config';
import { config as configTest } from './test-config';
import { Env, IConfig } from './config.interface';

export let CONFIG: IConfig;

switch (process.env.NODE_ENV as Env) {
  case 'development':
    CONFIG = configDev;
    break;
  case 'production':
    CONFIG = configProd;
    break;
  case 'test':
    CONFIG = configTest;
    break;
  default:
    throw new Error('Please, set proper NODE_ENV.');
}

CONFIG.isDevEnvironment = () => CONFIG.ENV === 'development';
CONFIG.isProdEnvironment = () => CONFIG.ENV === 'production';
CONFIG.isTestEnvironment = () => CONFIG.ENV === 'test';

Object.freeze(CONFIG);
