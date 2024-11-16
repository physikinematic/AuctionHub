import { Module } from '@nestjs/common';
import { AccountModule } from './modules/account/account.module';
import { AuctionModule } from './modules/auction/auction.module';
import { BidModule } from './modules/bid/bid.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AccountModule,
    AuctionModule,
    BidModule,
  ],
})
export class AppModule {}
