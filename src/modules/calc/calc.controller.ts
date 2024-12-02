import { Body, Controller, Post, Version } from '@nestjs/common';
import { CalcService } from './calc.service';
import { CalculateDto } from './dto/calculate.dto';

@Controller('calc')
export class CalcController {
  constructor(private readonly calcService: CalcService) { }

  @Post()
  @Version('1')
  async calculate(@Body() calcDetails: CalculateDto) {
    return this.calcService.calculate(calcDetails);
  }
}
