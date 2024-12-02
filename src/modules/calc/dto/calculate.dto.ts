import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import Operation from "src/types/enums/Operation.enum";
import IOperationDetails from "src/types/interfaces/OperationDetails.interface";

export class CalculateDto implements IOperationDetails {
  @IsNotEmpty()
  @IsNumber()
  leftValue: number;

  @IsNotEmpty()
  @IsNumber()
  rightValue: number;

  @IsNotEmpty()
  @IsEnum(Operation)
  op: Operation;
}