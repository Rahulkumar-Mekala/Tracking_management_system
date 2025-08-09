import { Module } from '@nestjs/common';
import { LiveTrackingService } from './live-tracking.service';
import { LiveTrackingController } from './live-tracking.controller';
import { LiveTrackingGateway } from './live-tracking.gateway';

@Module({
  providers: [LiveTrackingService,LiveTrackingGateway],
  controllers: [LiveTrackingController]
})
export class LiveTrackingModule {}
