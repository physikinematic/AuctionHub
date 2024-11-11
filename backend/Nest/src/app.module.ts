import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuctionModule } from './modules/auction/auction.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/user.entity';
import { BidModule } from './modules/bid/bid.module';
import { Auction } from './modules/auction/auction.entity';
import { Bid } from './modules/bid/bid.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Auction, Bid],
      synchronize: true
    }),
    UserModule, 
    AuctionModule, 
    BidModule 
  ],
})
export class AppModule {}