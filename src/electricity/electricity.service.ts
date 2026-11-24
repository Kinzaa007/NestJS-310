import { Injectable } from '@nestjs/common';

@Injectable()
export class ElectricityService {
  calculate(units: number, type: string) {
    const energyCharge =
      units <= 150
        ? units * 3
        : 150 * 3 + (units - 150) * 4;

    const serviceCharges: Record<string, number> = {
      residential: 40,
      business: 90,
    };

    const serviceCharge = serviceCharges[type];
    const total = energyCharge + serviceCharge;

    return {
      units,
      type,
      energyCharge,
      serviceCharge,
      total,
    };
  }
}