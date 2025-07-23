import { Module } from '@nestjs/common';
import { DepottableService } from './depottable.service';
import { DepottableController } from './depottable.controller';

@Module({
  providers: [DepottableService],
  controllers: [DepottableController]
})
export class DepottableModule {}
