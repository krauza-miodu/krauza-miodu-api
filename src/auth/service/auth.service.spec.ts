import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { UserEntity } from '../../user/entity/user.entity';
import { TokenJson, TokenPayloadAppData } from '../interface/token.interface';
import { UserService } from '../../user/service/user.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findOneByCredentials: () => null
          }
        },
        {
          provide: JwtService,
          useValue: {
            sign: (payload: any) => JSON.stringify(payload)
          }
        }
      ]
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('#findUserByCredentials', () => {
    it('should delegate task to UserService', async () => {
      const mockUser = 'user';

      spyOn(userService, 'findOneByCredentials').and.returnValue(mockUser);
      const foundUser = await authService.findUserByCredentials({email: '', password: ''});

      expect(foundUser).toEqual(mockUser);
    });
  });

  describe('#generateToken', () => {
    it('should generate token', async () => {
      const user = new UserEntity();
      user.email = 'test@mail.com';

      const token = await authService.generateToken(user);
      const expectedToken: TokenJson = {
        access_token: JSON.stringify({email: user.email} as TokenPayloadAppData)
      };

      expect(token).toEqual(expectedToken);
    });
  });
});
