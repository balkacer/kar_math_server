import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/models/User.model';
import { HistoryItem } from 'src/models/HistoryItem.model';
import IHistoryItemDetails from 'src/types/interfaces/HistoryItemDetails.interface';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(HistoryItem.name)
    private readonly historyItemModel: Model<HistoryItem>,
  ) {}

  async addItem(item: IHistoryItemDetails) {
    try {
      const result = await this.historyItemModel.create(item);
      return result.toObject();
    } catch (e: any) {
      console.log(e.message);
    }
  }
}
