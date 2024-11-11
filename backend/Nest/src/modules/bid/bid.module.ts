import { Module } from '@nestjs/common';
import { BidService } from './bid.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bid } from './bid.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bid])],
  providers: [BidService],
  exports: [BidService]
})
export class BidModule {}
