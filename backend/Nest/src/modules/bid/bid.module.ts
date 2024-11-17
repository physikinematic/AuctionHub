import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Bid, BidSchema } from './bid.schema';
import { BidService } from './bid.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Bid.name,
        schema: BidSchema,
      },
    ]),
  ],
  providers: [BidService],
  exports: [BidService],
})
export class BidModule {}
