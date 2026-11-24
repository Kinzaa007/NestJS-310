import { Injectable } from '@nestjs/common';

@Injectable()
export class FineService {
  calculate(days: number, type: string) {
    const rates: Record<string, number> = {
      general: 5,
      reserve: 20,
      reference: 50,
    };

    const chargeableDays = Math.max(0, days - 3);
    const rate = rates[type];
    const total = Math.min(chargeableDays * rate, 500);

    return {
      days,
      type,
      chargeableDays,
      rate,
      total,
    };
  }
}