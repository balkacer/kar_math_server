import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/models/User.model';
import { HistoryItem } from 'src/models/HistoryItem.model';
import IOperationDetails from 'src/types/interfaces/OperationDetails.interface';
import Operation from 'src/types/enums/Operation.enum';
import { HistoryService } from '../history/history.service';
import TResponseBody from 'src/types/ResponseBody.type';

@Injectable()
export class CalcService {
  private readonly executedOp: Record<
    Operation,
    (lv: number, rv: number) => number
  > = {
    sum: (lv, rv) => lv + rv,
    sub: (lv, rv) => lv - rv,
    mul: (lv, rv) => lv * rv,
    div: (lv, rv) => lv / rv,
  };

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(HistoryItem.name)
    private readonly historyItemModel: Model<HistoryItem>,
    private readonly historyService: HistoryService,
  ) {}

  async calculate(
    opDetails: IOperationDetails,
  ): Promise<TResponseBody<{ result: number }>> {
    const result = this.executedOp[opDetails.op](
      opDetails.leftValue,
      opDetails.rightValue,
    );
    try {
      const newHistoryItem = await this.historyService.addItem({
        ...opDetails,
        owner: '',
        result,
      });

      if (!newHistoryItem) {
        return {
          messages: ["This operation couldn't be saved in your history."],
          data: null,
          isSuccess: false,
        };
      }
    } catch (error) {
      return {
        messages: [
          error.message ?? "This operation couldn't be saved in your history.",
        ],
        data: null,
        isSuccess: false,
      };
    }

    return {
      messages: [],
      data: { result },
      isSuccess: true,
    };
  }
}
