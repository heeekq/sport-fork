import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import * as mongoose from 'mongoose';
// import { Order } from 'src/orders/orders.schema';
// import { Customer } from 'src/customers/customers.schema';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: false, default: '' })
  firstName: string;

  @Prop({ type: String, required: false, default: '' })
  lastName: string;

  @Prop({ type: Number, required: false, default: '' })
  yearOfBirth: number;

  @Prop({ type: String, required: false, default: '' })
  country: string;

  @Prop({ type: String, required: false, default: '' })
  city: string;

  @Prop({
    type: String,
    required: true,
    enum: ['customer', 'admin'],
    default: 'customer',
  })
  role: string;

  @Prop({ type: String, default: '' })
  verificationCode: string;

  @Prop({ type: String, default: Date.now() })
  dateCreated: Date;

  @Prop({ type: String, default: '', required: false })
  password: string;

  @Prop({ type: String, default: '', required: false })
  username: string;

  @Prop({ type: String, default: '', required: false })
  avatarURL: string;

  @Prop({ type: String, default: '', required: false })
  socialAuth: string;

  @Prop({ type: String, default: '', required: false })
  occupation: string;

  @Prop({ type: String, default: '', required: false })
  hobby: string;

  @Prop({
    type: String,
    required: true,
    enum: ['Not Verified', 'Verified', 'Not Required Verification'],
    default: 'Not Required Verification',
  })
  status: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  followers: UserDocument[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  following: UserDocument[];

  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] })
  // ordersList: Order[];

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: false })
  // customer: Customer;

  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Favorite' }] }) favoriteList: Order[];
}

export const UserSchema = SchemaFactory.createForClass(User);
