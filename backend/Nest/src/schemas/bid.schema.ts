import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Account } from './account.schema';
import { Auction } from './auction.schema';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Bid extends Document {
  @Prop({ type: Number, required: true })
  value: Number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Account',
  })
  owner: Account;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Auction',
  })
  auction: Auction;

  @Prop({ type: Boolean, default: false })
  deleted: boolean;

  createdAt: Date;

  updatedAt: Date;
}

export const BidSchema = SchemaFactory.createForClass(Bid);
