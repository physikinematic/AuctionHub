import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Role } from './role.schema';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
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
  role: Role;

  @Prop({ type: Boolean, default: false })
  deleted: boolean;

  createdAt: Date;

  updatedAt: Date;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
