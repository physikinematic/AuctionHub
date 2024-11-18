import { Test } from '@nestjs/testing';
import { AuctionService } from '../../services/auction.service';

describe('AccountService', () => {
  let service: AuctionService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuctionService],
    }).compile();

    service = module.get(AuctionService);
  });

  /// General
  it('can create an instance of account service', async () => {
    expect(service).toBeDefined();
  });
  /// End General
});
