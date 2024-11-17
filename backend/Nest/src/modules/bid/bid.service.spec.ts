import { Test } from '@nestjs/testing';
import { BidService } from './bid.service';

describe('AccountService', () => {
  let service: BidService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BidService],
    }).compile();

    service = module.get(BidService);
  });

  /// General
  it('can create an instance of account service', async () => {
    expect(service).toBeDefined();
  });
  /// End General
});
