import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { userEntityMocks } from '../__mocks__/user.mock';

describe('User2Service', () => {
  let service: UserService;
  let UserRepository: Repository<UserEntity>; // mocando repository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOnde: jest.fn().mockResolvedValue(userEntityMocks),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    UserRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(UserRepository).toBeDefined();
  });

  it('should return user in getAllUserByEmail', async () => {
    const user = await service.getAllUserByEmail(userEntityMocks.email);

    expect(user).toEqual(userEntityMocks);
  });
});
