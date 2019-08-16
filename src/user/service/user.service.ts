import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserEntity } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {

  constructor(private userRepository: UserRepository) {}

  async findOneById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOne({id});
  }

  async findOneByCredentials(email: string, password: string): Promise<UserEntity | null> {
    const user: UserEntity = await this.userRepository.findOne({
      where: {email},
      select: ['id', 'email', '_password']
    });

    if (user && this.comparePasswords(password, user._password)) {
      return user;
    } else {
      return null;
    }
  }

  static hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

}
