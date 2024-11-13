import { Injectable } from '@nestjs/common';
import { BidService } from '../bid/bid.service';

@Injectable()
export class AuctionService {
  constructor(private readonly bidService: BidService) {}
}