
import { Injectable } from '@nestjs/common';

@Injectable()
export class ElectricityService {
  calculate(units: number, type: string) {
    // คำนวณค่าพลังงานแบบขั้นบันได
    let energyCharge = 0;

    if (units <= 150) {
      energyCharge = units * 3;
    } else {
      energyCharge = (150 * 3) + ((units - 150) * 4);
    }

    // คำนวณค่าบริการรายเดือน
    const serviceCharges: Record<string, number> = {
      residential: 40,
      business: 90,
    };

    const serviceCharge = serviceCharges[type];

    // คำนวณยอดรวม
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
