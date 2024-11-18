import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from './modules/account.module';
import { AuctionModule } from './modules/auction.module';
import { BidModule } from './modules/bid.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AccountModule,
    AuctionModule,
    BidModule,
  ],
})
export class AppModule {}
