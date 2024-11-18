import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuctionOwnerAuthGuard } from 'src/guards/auctionOwnerAuth.guard';
import { Auction, AuctionSchema } from 'src/schemas/auction.schema';
import { Category, CategorySchema } from 'src/schemas/category.schema';
import { AuctionController } from '../controllers/auction.controller';
import { AuctionService } from '../services/auction.service';
import { BidModule } from './bid.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Auction.name,
        schema: AuctionSchema,
      },
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
    BidModule,
  ],
  controllers: [AuctionController],
  providers: [AuctionService, AuctionOwnerAuthGuard],
})
export class AuctionModule {}
