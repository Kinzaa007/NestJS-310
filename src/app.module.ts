
import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ShippingModule } from './shipping/shipping.module.js';
import { FineModule } from './fine/fine.module.js';
import { ElectricityModule } from './electricity/electricity.module.js';
import { ConverterModule } from './converter/converter.module.js';

@Module({
  imports: [
    ShippingModule,
    FineModule,
    ElectricityModule,
    ConverterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
