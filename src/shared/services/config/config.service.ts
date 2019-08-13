import { Injectable } from '@nestjs/common';

import { IConfig } from '../../config/config.interface';
import { config as devConfig } from '../../config/development-config';
import { config as prodConfig } from '../../config/production-config';
import { config as testConfig } from '../../config/test-config';

@Injectable()
export class ConfigService {

  readonly config: IConfig;

  constructor() {
    switch (process.env.NODE_ENV) {
      case 'development':
        this.config = devConfig;
        break;
      case 'production':
        this.config = prodConfig;
        break;
      case 'test':
        this.config = testConfig;
        break;
      default:
        throw new Error('Please, set proper NODE_ENV.');
    }
  }

}
