import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Auction extends Document {}

export const AuctionSchema = SchemaFactory.createForClass(Auction);
