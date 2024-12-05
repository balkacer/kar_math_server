import Operation from '../enums/Operation.enum';

interface IHistoryItemDetails {
  owner: string;
  leftValue: number;
  rightValue: number;
  op: Operation;
  result: number;
}

export default IHistoryItemDetails;
