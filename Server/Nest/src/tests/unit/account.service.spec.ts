import { Test } from '@nestjs/testing';
import { AccountService } from '../../services/account.service';

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AccountService],
    }).compile();

    service = module.get(AccountService);
  });

  /// General
  it('can create an instance of account service', async () => {
    expect(service).toBeDefined();
  });
  /// End General
});
