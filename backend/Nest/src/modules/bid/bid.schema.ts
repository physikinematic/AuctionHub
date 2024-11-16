import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Bid extends Document {}

export const BidSchema = SchemaFactory.createForClass(Bid);
