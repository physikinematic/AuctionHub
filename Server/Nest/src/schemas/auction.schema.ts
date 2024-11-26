import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Account } from './account.schema';
import { Category } from './category.schema';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Auction extends Document {
  @Prop({ type: String, required: true })
  name: String;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  })
  category: Category;

  @Prop({ type: String })
  description: String;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Account',
  })
  owner: Account;

  @Prop({ type: Number, required: true })
  initialPrice: Number;

  @Prop({ type: Number, required: true })
  minBid: Number;

  @Prop({ type: Date, required: true })
  endDate: Date;

  @Prop({ type: Boolean, default: false })
  deleted: boolean;

  createdAt: Date;

  updatedAt: Date;
}

export const AuctionSchema = SchemaFactory.createForClass(Auction);
