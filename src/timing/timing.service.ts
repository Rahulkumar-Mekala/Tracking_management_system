import { BadRequestException, Injectable } from '@nestjs/common';
import { and, eq, or, sql } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import { db } from 'src/db/db.connection';
import { bustable, ConductorAssignment, DEPOTtable, DriverAssignment, locationtable, routetable, timmingtable } from 'src/db/schema';

@Injectable()
export class TimingService {

    async createtimmingtable(bus_id:string,source_location_id:string,destination_location_id:string,departure_time:string,arrival_time:string,trip_date:string):Promise<{}>{

        const result= await db.insert(timmingtable).values({bus_id,source_location_id,destination_location_id,departure_time,arrival_time,trip_date}).returning();
         return{
            result
         } 
    }


async sourceanddestination(source_location_id: string, destination_location_id: string) {
  const SourceLocation = alias(locationtable, "source_location");
  const DestinationLocation = alias(locationtable, "destination_location");

  const result = await db
    .select({
      BusNumber: bustable.bus_number,
      BusType: bustable.bus_type,
      Capacity: bustable.capacity,
      DepotCode: DEPOTtable.depo_code_number,
      DepotName: DEPOTtable.depo_name,
      DepotContact: DEPOTtable.contact_number,
      driver_code:DriverAssignment.driver_code,
      driver_phonenumber:DriverAssignment.driver_phonenumber,
     counductor_code:ConductorAssignment.condutor_code,
      counductor_phonenumber:ConductorAssignment.conductor_phonenumber,

      Source: timmingtable.source_location_id,
      Destination: timmingtable.destination_location_id,
      Departure: timmingtable.departure_time,
      Arrival: timmingtable.arrival_time,
      TripDate: timmingtable.trip_date,
      Stops: routetable.stops,
      Status: routetable.status,
    })
    .from(timmingtable)
    .innerJoin(SourceLocation, eq(SourceLocation.location_name, timmingtable.source_location_id))
    .innerJoin(DestinationLocation, eq(DestinationLocation.location_name, timmingtable.destination_location_id))
    .innerJoin(bustable, eq(bustable.bus_number, timmingtable.bus_id))
    .innerJoin(DEPOTtable, eq(DEPOTtable.depo_code_number, bustable.depo_code_number)).innerJoin(DriverAssignment,eq(DriverAssignment.bus_id,bustable.bus_number))
    .innerJoin(ConductorAssignment,eq(ConductorAssignment.bus_id,bustable.bus_number))
    .innerJoin(
      routetable,
      and(
        eq(routetable.source_location_id, timmingtable.source_location_id),
        eq(routetable.destination_location_id, timmingtable.destination_location_id)
      )
    )
    .where(
      and(
        eq(timmingtable.source_location_id, source_location_id),
        eq(timmingtable.destination_location_id, destination_location_id)
      )
    );

  if (result.length === 0) {
    throw new BadRequestException("No buses found for the given source and destination");
  }

  return { result };
}

 async AllDetails(){
   const result = await db.select().from(timmingtable);
    return{
      result
    }
 }

 
 async getTimingWithPagination(page: number, limit: number) {
  
  const currentPage = Math.max(1, page);
  const pageSize = Math.max(1, limit);
  const offset = (currentPage - 1) * pageSize;

 
  const totalRecordsResult = await db.select({ count: sql<number>`count(*)` })
    .from(timmingtable);
  const totalRecords = totalRecordsResult[0].count;


  const result = await db.select({
    Source: timmingtable.source_location_id,
    Destination: timmingtable.destination_location_id
  })
    .from(timmingtable)
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
