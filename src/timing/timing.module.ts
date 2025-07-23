import { Module } from '@nestjs/common';
import { TimingService } from './timing.service';
import { TimingController } from './timing.controller';

@Module({
  providers: [TimingService],
  controllers: [TimingController]
})
export class TimingModule {}
