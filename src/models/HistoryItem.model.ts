import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './User.model';
import Operation from 'src/types/enums/Operation.enum';

export type HistoryItemDocument = HydratedDocument<HistoryItem>;

@Schema({ timestamps: true })
export class HistoryItem {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({ required: true })
  leftValue: string;

  @Prop({ required: true, unique: true })
  rightValue: string;

  @Prop({ required: true, enum: Operation })
  op: Operation;
}

export const HistoryItemSchema = SchemaFactory.createForClass(HistoryItem);
