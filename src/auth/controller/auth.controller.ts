import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';

import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../service/auth.service';
import { TokenJson } from '../interface/token.interface';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body('credentials') credentials: LoginDto): Promise<TokenJson> {
    const user = await this.authService.findUserByCredentials(credentials);

    if (user) {
      return this.authService.generateToken(user);
    } else {
      throw new UnauthorizedException();
    }
  }

}
