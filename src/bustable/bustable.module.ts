import { Module } from '@nestjs/common';
import { BustableService } from './bustable.service';
import { BustableController } from './bustable.controller';

@Module({
  providers: [BustableService],
  controllers: [BustableController]
})
export class BustableModule {}
