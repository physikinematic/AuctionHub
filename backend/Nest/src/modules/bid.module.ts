import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BidOwnerAuthGuard } from 'src/guards/bidOwnerAuthorized.guard';
import { Bid, BidSchema } from 'src/schemas/bid.schema';
import { BidService } from '../services/bid.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Bid.name,
        schema: BidSchema,
      },
    ]),
  ],
  providers: [BidService, BidOwnerAuthGuard],
  exports: [BidService],
})
export class BidModule {}
