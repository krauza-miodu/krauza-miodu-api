import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserEntity } from '../../user/entity/user.entity';
import { TokenJson, TokenPayloadAppData } from '../interface/token.interface';
import { UserService } from '../../user/service/user.service';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {

  constructor(private userService: UserService, private jwtService: JwtService) {}

  async findUserByCredentials(credentials: LoginDto): Promise<UserEntity | null> {
    return await this.userService.findOneByCredentials(credentials.email, credentials.password);
  }

  async generateToken(user: UserEntity): Promise<TokenJson> {
    const payload: TokenPayloadAppData = { email: user.email };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }

}
