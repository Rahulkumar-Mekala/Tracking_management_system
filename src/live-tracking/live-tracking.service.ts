import { Injectable } from '@nestjs/common';
import { LiveTrackingGateway } from './live-tracking.gateway';


import { db } from 'src/db/db.connection';
import { bus_live_tracking } from 'src/db/schema';
import { eq } from 'drizzle-orm';
@Injectable()
export class LiveTrackingService {
    constructor(private gateway: LiveTrackingGateway) {}

  async saveAndBroadcast(trackingData: any) {
    
   await db.insert(bus_live_tracking).values({
  bus_id: trackingData.bus_id,
  latitude: trackingData.latitude,
  longitude: trackingData.longitude,
  speed: trackingData.speed ?? 0,
  recorded_at: trackingData.recorded_at ? new Date(trackingData.recorded_at) : new Date(), 
});
   
    this.gateway.sendTrackingData(trackingData);

    console.log("📍 Stored & Broadcasted:", trackingData);
  }

  async getBusHistory(busId: string) {
    return await db
      .select().from(bus_live_tracking).where(eq(bus_live_tracking.bus_id,busId)).orderBy(bus_live_tracking.recorded_at);
  }
}
