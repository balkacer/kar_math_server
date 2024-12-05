import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/models/User.model';
import { HistoryItem } from 'src/models/HistoryItem.model';
import IOperationDetails from 'src/types/interfaces/OperationDetails.interface';
import Operation from 'src/types/enums/Operation.enum';
import { HistoryService } from '../history/history.service';

@Injectable()
export class CalcService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(HistoryItem.name)
    private readonly historyItemModel: Model<HistoryItem>,
    private readonly historyService: HistoryService,
  ) {}

  async calculate(opDetails: IOperationDetails): Promise<{ result: number }> {
    console.log(opDetails);

    const executedOp: Record<Operation, (lv: number, rv: number) => number> = {
      sum: (lv, rv) => lv + rv,
      sub: (lv, rv) => lv - rv,
      mul: (lv, rv) => lv * rv,
      div: (lv, rv) => lv / rv,
    };

    const result = await new Promise<number>((resolve) => {
      const _result = executedOp[opDetails.op](
        opDetails.leftValue,
        opDetails.rightValue,
      );

      resolve(_result);
    });

    this.historyService.addItem({
      ...opDetails,
      owner: '',
      result,
    });

    return {
      result,
    };
  }
}
