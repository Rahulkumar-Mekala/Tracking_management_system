import { BadRequestException, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { db } from 'src/db/db.connection';
import { Bus, Route, Timing } from 'src/db/schema';
type bustype = "ORDINARY" | "EXPRESS" | "DELUXE" | "SUPER_LUXURY" | "GARUDA" | "METRO_EXPRESS";

@Injectable()
export class BustableService {
    async createbustable(bus_number: string,bus_type: bustype,depo_id: string): Promise<{}> {

  function getCapacityByBusType(type: string): number {
    switch (type) {
      case 'ORDINARY': return 60;
      case 'EXPRESS': return 50;
      case 'DELUXE': return 45;
      case 'SUPER_LUXURY': return 40;
      case 'GARUDA': return 30;
      case 'METRO_EXPRESS': return 55;
      default: return 60;
    }
  }
  
  const finalCapacity: number = getCapacityByBusType(bus_type);

  const result = await db.insert(Bus).values({bus_number,bus_type,capacity: finalCapacity,depo_id,}).returning();

  return {
    message: 'Bus added successfully',
    bus_number,
    result,
  };
}
 async GetByBusNumber(bus_number:string){
     const result = await db.
     select({bus_number: Bus.bus_number,
      bus_type:Bus.bus_type,
      //  capacity:Bus.capacity,
      depo_id:Bus.depo_id,
     
      departure_time: Timing.departure_time,
     stops:Route.stops,
     status:Route.status,
      arrival_time: Timing.arrival_time,
      source_location_id: Timing.source_location_id,
      destination_location_id: Timing.destination_location_id,
      trip_date: Timing.trip_date,
             
     }).from(Bus).where(eq(Bus.bus_number,bus_number)).innerJoin(Timing,eq(Timing.bus_id,Bus.bus_number)).innerJoin(Route,and(eq(Route.source_location_id,Timing.source_location_id),eq(Route.destination_location_id,Timing.destination_location_id)));
      if (result.length===0) {
          throw new BadRequestException(" Invalidate Bus Number  try again")
        
      }
      return {
        result
      }

 }
  async AllBusNumber(){
     const  result = await db.select({BusNumber:Bus.bus_number}).from(Bus);
      return{
        result
      }
  }
}
