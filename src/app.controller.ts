import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  healthcheck(): any {
    return {
      status: 'OK'
    };
  }

}
