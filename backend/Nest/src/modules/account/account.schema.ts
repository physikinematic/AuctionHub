import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Account extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({
    required: true,
    unique: true,
    update: false,
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    required: true,
    enum: ['user', 'admin'],
  })
  role: string;

  @Prop({ required: true, default: true })
  active: boolean;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
