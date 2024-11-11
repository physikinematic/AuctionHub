import { Module } from '@nestjs/common';
import { AuctionController } from './auction.controller';
import { AuctionService } from './auction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auction } from './auction.entity';
import { BidModule } from '../bid/bid.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Auction]), BidModule, UserModule],
  controllers: [AuctionController],
  providers: [AuctionService]
})
export class AuctionModule {}