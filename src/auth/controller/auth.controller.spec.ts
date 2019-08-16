import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';

import { UserEntity } from '../../user/entity/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from '../service/auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            findUserByCredentials: () => null,
            generateToken: () => null
          }
        }
      ]
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(AuthController).toBeDefined();
  });

  describe('#login', () => {
    describe('when credentials were correct', () => {
      it('should return generated token', async () => {
        const email = 'test@mail.com';

        spyOn(authService, 'findUserByCredentials').and.returnValue({email});
        spyOn(authService, 'generateToken').and.callFake((u: UserEntity) => u.email);

        await expect(authController.login({email: '', password: ''})).resolves.toEqual(email);
      });
    });

    describe('when credentials were not correct', () => {
      it('should return return 401 response', async () => {
        spyOn(authService, 'findUserByCredentials').and.returnValue(null);

        await expect(authController.login({email: '', password: ''}))
          .rejects.toThrowError(UnauthorizedException);
      });
    });
  });
});
