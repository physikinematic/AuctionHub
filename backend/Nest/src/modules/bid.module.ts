import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BidController } from 'src/controllers/bid.controller';
import { BidOwnerAuthGuard } from 'src/guards/bidOwnerAuthorized.guard';
import { Bid, BidSchema } from 'src/schemas/bid.schema';
import { BidService } from '../services/bid.service';
import { AuctionModule } from './auction.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Bid.name,
        schema: BidSchema,
      },
    ]),
    forwardRef(() => AuctionModule),
  ],
  controllers: [BidController],
  providers: [BidService, BidOwnerAuthGuard],
  exports: [BidService],
})
export class BidModule {}
