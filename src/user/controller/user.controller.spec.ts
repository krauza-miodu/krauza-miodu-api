import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from './user.controller';
import { UserService } from '../service/user.service';
import { NotFoundException } from '@nestjs/common';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findOneById: () => null
          }
        }
      ]
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(UserController).toBeDefined();
  });

  describe('#getUser', () => {
    describe('when user is found', () => {
      it('should return user', async () => {
        spyOn(userService, 'findOneById').and.callFake(id => `user_${id}`);

        await expect(userController.getUser(3)).resolves.toEqual('user_3');
      });
    });

    describe('when user is not found', () => {
      it('should return return 404 response', async () => {
        spyOn(userService, 'findOneById').and.returnValue(null);

        await expect(userController.getUser(3)).rejects.toThrowError(NotFoundException);
      });
    });
  });
});
