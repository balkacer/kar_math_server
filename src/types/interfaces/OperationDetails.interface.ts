import Operation from "../enums/Operation.enum";

interface IOperationDetails {
  leftValue: number;
  rightValue: number;
  op: Operation;
}

export default IOperationDetails;