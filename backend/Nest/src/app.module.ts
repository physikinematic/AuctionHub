import { Module } from '@nestjs/common';
import { AccountModule } from './modules/account/account.module';
import { AuctionModule } from './modules/auction/auction.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './modules/account/entities/account.entity';
import { BidModule } from './modules/bid/bid.module';
import { Auction } from './modules/auction/auction.entity';
import { Bid } from './modules/bid/bid.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Account, Auction, Bid],
      synchronize: true
    }),
    AccountModule, 
    AuctionModule, 
    BidModule 
  ],
})
export class AppModule {}