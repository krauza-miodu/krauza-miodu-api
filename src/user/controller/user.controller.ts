import { Controller, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from '../service/user.service';
import { UserEntity } from '../entity/user.entity';

@Controller('user')
export class UserController {

  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getUser(@Param('id') id: number): Promise<UserEntity> {
    const user = await this.userService.findOneById(id);

    if (user) {
      return user;
    } else {
      throw new NotFoundException();
    }
  }

}
