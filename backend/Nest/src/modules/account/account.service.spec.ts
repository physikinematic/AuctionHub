import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { Account } from './account.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(async () => {
    const mockRepo = {
      count: (o: {where?}) => Promise.resolve(1),
      find: (o: {where?, skip?, take?, select?}) => Promise.resolve([]),
      findOne: (o: {where?, select?}) => Promise.resolve({}),
      create: (attrs: Partial<Account>) => ({} as Account),
      save: (account: Account) => {},
      remove: (account: Account) => {},
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: getRepositoryToken(Account),
          useValue: mockRepo
        }
      ],
    }).compile();

    service = module.get(AccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
