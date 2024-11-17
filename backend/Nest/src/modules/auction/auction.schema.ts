import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Account } from '../account/account.schema';

@Schema()
export class Auction extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Account',
  })
  owner: Account;

  @Prop({ type: Date, default: Date.now, immutable: true })
  dateAdded: Date;

  @Prop({ type: Boolean, default: false })
  deleted: boolean;
}

export const AuctionSchema = SchemaFactory.createForClass(Auction);
