import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Account } from '../account/account.schema';

@Schema()
export class Bid extends Document {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
  })
  owner: Account;

  @Prop({ default: Date.now, immutable: true })
  dateAdded: Date;

  @Prop({ default: false })
  deleted: boolean;
}

export const BidSchema = SchemaFactory.createForClass(Bid);
