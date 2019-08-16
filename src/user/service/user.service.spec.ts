import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

import { UserService } from './user.service';
import { UserRepository } from '../repository/user.repository';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            findOne: () => null
          }
        }
      ]
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('#findOneById', () => {
    it('should return user', async () => {
      spyOn(userRepository, 'findOne').and.callFake(constraints => ({
        id: constraints.id
      }));

      await expect(await userService.findOneById(3)).toStrictEqual({id: 3});
    });
  });

  describe('#findOneByCredentials', () => {
    beforeEach(() => {
      spyOn(userRepository, 'findOne').and.returnValue('user');
    });

    describe('when password matches', () => {
      beforeEach(() => {
        spyOn(userService, 'comparePasswords').and.returnValue(true);
      });

      it('should return user', async () => {
        await expect(await userService.findOneByCredentials('', '')).toBe('user');
      });
    });

    describe('when password does not match', () => {
      beforeEach(() => {
        spyOn(userService, 'comparePasswords').and.returnValue(null);
      });

      it('should return null', async () => {
        await expect(await userService.findOneByCredentials('', '')).toBe(null);
      });
    });
  });

  describe('#hashPassword', () => {
    it('should return hashed password', () => {
      spyOn(bcrypt, 'hashSync').and.callThrough();

      const originalPassword = 'qwerty123';
      const hashedPassword = UserService.hashPassword(originalPassword);

      expect(hashedPassword.length).toEqual(60);
      expect(hashedPassword !== originalPassword).toBe(true);
      expect(bcrypt.hashSync).toHaveBeenCalled();
    });
  });

  describe('#comparePasswords', () => {
    it('should return true for matching password', async () => {
      await expect(
        await userService.comparePasswords(
          'qwerty',
          UserService.hashPassword('qwerty')
        )
      ).toBe(true);
    });

    it('should return false for incorrect password', async () => {
      await expect(
        await userService.comparePasswords(
          'qwerty',
          UserService.hashPassword('ytrewq')
        )
      ).toBe(false);
    });
  });
});
