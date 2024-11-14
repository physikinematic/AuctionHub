import { Test } from '@nestjs/testing';
import { AccountService } from "../account.service";
import { UserService } from "./user.service";
import { Account } from '../account.entity';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let mockAccountService: Partial<AccountService>;
  const users: Account[] = [];

  beforeEach(async () => {
    mockAccountService = {
      findOne: ({ email }) => {
        const user = users.find(a => a.email == email);
        return Promise.resolve(user);
      },
      create: ({
        firstName,
        lastName,
        email,
        password
      }) => {
        const newUser = {id: Math.floor(Math.random() * 999999).toString(), firstName, lastName, email, password} as Account;
        users.push(newUser);
        return Promise.resolve(newUser);
      },
      remove: ({ id }) => {
        const index = users.findIndex(a => a.id === id);
        users.splice(index, 1);
        return Promise.resolve();
      }
    }

    const module = await Test.createTestingModule({
      providers: [UserService, {
        provide: AccountService,
        useValue: mockAccountService
      }]
    }).compile();

    service = module.get(UserService);
  });

  it('can create an instance of user service', async () => {
    expect(service).toBeDefined();
  });

  it('throws an error if the user is already signed up', async () => {
    await service.signup('as', 'asd', 'test@test.test', '123qwe!@#QWE')
    await expect(service.signup('as', 'asd', 'test@test.test', '123qwe!@#QWE'))
      .rejects
      .toThrow(ConflictException);
  });

  it('signs in successfully', async () => {
    const user = await service.signin('test@test.test', '123qwe!@#QWE');
    expect(user).toBeDefined();
  });

  it('throws an error when password is incorrect', async () => {
    await expect(service.signin('test@test.test', 'other_password'))
      .rejects
      .toThrow(UnauthorizedException);
  });

  it('removes account successfully', async () => {
    const user = users.find(a => a.email === 'test@test.test');
    const index = users.indexOf(user);
    await service.removeAccount(user.id);
    
    expect(user[index]).toBeUndefined();
  });
})