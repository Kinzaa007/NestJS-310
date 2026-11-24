
import { Injectable } from '@nestjs/common';

@Injectable()
export class ShippingService {
  calculate(weight: number, zone: string) {
    const baseFee =
      50 + Math.ceil(Math.max(0, weight - 1)) * 18;

    const zoneFees: Record<string, number> = {
      bangkok: 0,
      north: 10,
      south: 25,
    };

    const zoneFee = zoneFees[zone];
    const total = baseFee + zoneFee;

    return {
      weight,
      zone,
      baseFee,
      zoneFee,
      total,
    };
  }
}
