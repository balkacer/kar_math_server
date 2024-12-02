import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { User, UserSchema } from 'src/models/User.model';
import { HistoryItem, HistoryItemSchema } from 'src/models/HistoryItem.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: HistoryItem.name, schema: HistoryItemSchema },
  ])],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule { }