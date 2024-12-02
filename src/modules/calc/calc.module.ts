import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CalcController } from './calc.controller';
import { CalcService } from './calc.service';
import { User, UserSchema } from 'src/models/User.model';
import { HistoryItem, HistoryItemSchema } from 'src/models/HistoryItem.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: HistoryItem.name, schema: HistoryItemSchema },
  ])],
  controllers: [CalcController],
  providers: [CalcService],
})
export class CalcModule { }