
import {
  Controller,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common';

import { ElectricityService } from './electricity.service.js';

@Controller('electricity')
export class ElectricityController {
  constructor(
    private readonly electricityService: ElectricityService,
  ) {}

  @Get()
  calculate(
    @Query('units') units: string,
    @Query('type') type: string,
  ) {
    if (
      typeof units !== 'string' ||
      units.trim() === '' ||
      !/^\d+$/.test(units)
    ) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'units ต้องเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป',
      });
    }

    const u = Number(units);

    if (!Number.isSafeInteger(u) || u < 0) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'units ต้องเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป',
      });
    }

    const serviceCharges: Record<string, number> = {
      residential: 40,
      business: 90,
    };

    if (
      typeof type !== 'string' ||
      !Object.prototype.hasOwnProperty.call(serviceCharges, type)
    ) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'type ไม่ถูกต้อง',
      });
    }

    return this.electricityService.calculate(u, type);
  }
}
