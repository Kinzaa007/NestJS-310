
import {
  Controller,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ShippingService } from './shipping.service.js';

@Controller('shipping')
export class ShippingController {
  constructor(
    private readonly shippingService: ShippingService,
  ) {}

  @Get()
  calculate(
    @Query('weight') weight: string,
    @Query('zone') zone: string,
  ) {
    if (
      weight === undefined ||
      weight.trim() === '' ||
      !Number.isFinite(Number(weight)) ||
      Number(weight) <= 0
    ) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'weight ต้องเป็นตัวเลขมากกว่า 0',
      });
    }

    const zones: Record<string, number> = {
      bangkok: 0,
      north: 10,
      south: 25,
    };

    if (!zone || !Object.prototype.hasOwnProperty.call(zones, zone)) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'zone ไม่ถูกต้อง',
      });
    }

    return this.shippingService.calculate(Number(weight), zone);
  }
}
