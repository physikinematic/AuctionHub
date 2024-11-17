import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Roles } from './roles.schema';

@Schema()
export class Account extends Document {
  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    update: false,
  })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Role' })
  role: Roles;

  @Prop({ type: Boolean, default: false })
  deleted: boolean;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
