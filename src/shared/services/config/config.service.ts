import { Injectable } from '@nestjs/common';

import { IConfig } from '../../config/config.interface';
import { config as devConfig } from '../../config/development-config';
import { config as prodConfig } from '../../config/production-config';
import { config as testConfig } from '../../config/test-config';

export type Env = 'production' | 'development' | 'test';

@Injectable()
export class ConfigService {

  private readonly env: Env;
  readonly config: IConfig;

  constructor() {
    switch (process.env.NODE_ENV) {
      case 'development':
        this.env = 'development';
        this.config = devConfig;
        break;
      case 'production':
        this.env = 'production';
        this.config = prodConfig;
        break;
      case 'test':
        this.env = 'test';
        this.config = testConfig;
        break;
      default:
        throw new Error('Please, set proper NODE_ENV.');
    }
  }

  isDevEnvironment(): boolean {
    return this.env === 'development';
  }

  isProdEnvironment(): boolean {
    return this.env === 'production';
  }

  isTestEnvironemnt(): boolean {
    return this.env === 'test';
  }

}
