import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LiveTrackingService } from './live-tracking.service';

@Controller('live-tracking')
export class LiveTrackingController {
     constructor(private trackingService: LiveTrackingService) {}

  @Post("trackingData")
  async receiveLocation(@Body() data: any) {
    const trackingData = {
   tracking_id: data.tracking_id,
      bus_id: data.bus_id,
      latitude: data.latitude,
      longitude: data.longitude,
      speed: data.speed ?? 0,
      record_time: new Date(),
    };

    await this.trackingService.saveAndBroadcast(trackingData);
    return {
        trackingData,
         status: 'location updated' };
  }


  @Get(':busId')
  async getBusHistory(@Param('busId') busId: string) {
    return await this.trackingService.getBusHistory(busId);
  }
}
