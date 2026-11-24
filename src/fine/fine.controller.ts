
import {
  Controller,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common';

import { FineService } from './fine.service.js';

@Controller('fine')
export class FineController {
  constructor(
    private readonly fineService: FineService,
  ) {}

  @Get()
  calculate(
    @Query('days') days: string,
    @Query('type') type: string,
  ) {
    // ตรวจสอบ days
    if (
      days === undefined ||
      days.trim() === '' ||
      !/^\d+$/.test(days)
    ) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'days ต้องเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป',
      });
    }

    const d = Number(days);

    if (!Number.isSafeInteger(d) || d < 0) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'days ต้องเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป',
      });
    }

    // ตรวจสอบประเภทหนังสือ
    const rates: Record<string, number> = {
      general: 5,
      reserve: 20,
      reference: 50,
    };

    if (
      type === undefined ||
      type.trim() === '' ||
      !Object.prototype.hasOwnProperty.call(rates, type)
    ) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'type ไม่ถูกต้อง',
      });
    }

    // คำนวณค่าปรับ
    return this.fineService.calculate(d, type);
  }
}
