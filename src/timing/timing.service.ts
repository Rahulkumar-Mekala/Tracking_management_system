import { Injectable } from '@nestjs/common';
import { and, eq, or, sql } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import { db } from 'src/db/db.connection';
import { Bus, Depot, Location, Route, Timing } from 'src/db/schema';

@Injectable()
export class TimingService {

    async createtimmingtable(bus_id:string,source_location_id:string,destination_location_id:string,departure_time:string,arrival_time:string,trip_date:string):Promise<{}>{

        const result= await db.insert(Timing).values({bus_id,source_location_id,destination_location_id,departure_time,arrival_time,trip_date}).returning();
         return{
            result
         } 
    }


async sourceanddestination(source_location_id: string, destination_location_id: string) {
  const SourceLocation = alias(Location, "source_location");
  const DestinationLocation = alias(Location, "destination_location");

  const result = await db
    .select({
       Busnumber: Bus.bus_number,
       BusType:Bus.bus_type,
       Depot:Depot.depo_code_number,
       source:Timing.source_location_id,
       Destination:Timing.destination_location_id,
       Departure:Timing.departure_time,
       Arrival:Timing.arrival_time,
       Trip_Date:Timing.trip_date,
        Stops:Route.stops,
        Status:Route.status
    
    })
    .from(Timing)
    .innerJoin(SourceLocation, eq(SourceLocation.location_name, Timing.source_location_id))
    .innerJoin(DestinationLocation, eq(DestinationLocation.location_name, Timing.destination_location_id))
    .innerJoin(Bus, eq(Bus.bus_number, Timing.bus_id))
    .innerJoin(Depot, eq(Depot.depo_code_number, Bus.depo_id))
    .where(
      and(
        eq(Timing.source_location_id, source_location_id),
        eq(Timing.destination_location_id, destination_location_id)
      )
    ).innerJoin(Route, and(eq(Route.source_location_id,Timing.source_location_id),eq(Route.destination_location_id,Timing.destination_location_id)));

  return result;
}
 async AllDetails(){
   const result = await db.select().from(Timing);
    return{
      result
    }
 }

 
 async getTimingWithPagination(page: number, limit: number) {
  
  const currentPage = Math.max(1, page);
  const pageSize = Math.max(1, limit);
  const offset = (currentPage - 1) * pageSize;

 
  const totalRecordsResult = await db.select({ count: sql<number>`count(*)` })
    .from(Timing);
  const totalRecords = totalRecordsResult[0].count;


  const result = await db.select({
    Source: Timing.source_location_id,
    Destination: Timing.destination_location_id
  })
    .from(Timing)
    .limit(pageSize)
    .offset(offset);

  return {
    data: result,
    meta: {
      totalRecords,
      currentPage,
      pageSize,
      totalPages: Math.ceil(totalRecords / pageSize),
    },
  };
}

}
