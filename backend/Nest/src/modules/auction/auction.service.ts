import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auction } from './auction.schema';

@Injectable()
export class AuctionService {
  constructor(@InjectModel(Auction.name) protected model: Model<Auction>) {}
}
