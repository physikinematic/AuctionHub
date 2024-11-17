import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BidModule } from '../bid/bid.module';
import { AuctionController } from './auction.controller';
import { Auction, AuctionSchema } from './auction.schema';
import { AuctionService } from './auction.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Auction.name,
        schema: AuctionSchema,
      },
    ]),
    BidModule,
  ],
  controllers: [AuctionController],
  providers: [AuctionService],
})
export class AuctionModule {}
