
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/models/User.model';
import { HistoryItem } from 'src/models/HistoryItem.model';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(HistoryItem.name) private readonly historyItemModel: Model<HistoryItem>,
  ) { }

  // Implements...
}
