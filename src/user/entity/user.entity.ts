import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { UserService } from '../service/user.service';

@Entity('user')
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    nullable: false,
    unique: true
  })
  email: string;

  @Column({
    name: 'password',
    length: 60,
    nullable: false,
    select: false
  })
  _password: string;

  set password(password: string) {
    this._password = UserService.hashPassword(password);
  }

}
