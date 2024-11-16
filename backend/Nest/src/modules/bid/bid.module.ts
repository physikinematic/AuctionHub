import { Module } from '@nestjs/common';
import { BidService } from './bid.service';
import { Bid } from './bid.schema';

@Module({
  imports: [],
  providers: [BidService],
  exports: [BidService],
})
export class BidModule {}
