import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bid } from './bid.schema';

@Injectable()
export class BidService {
  constructor(@InjectModel(Bid.name) protected model: Model<Bid>) {}
}
