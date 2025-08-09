import { BadRequestException, Injectable } from '@nestjs/common';
import { and, eq, sql } from 'drizzle-orm';
import { db } from 'src/db/db.connection';
import { bustable, ConductorAssignment, DEPOTtable, DriverAssignment, routetable, timmingtable } from 'src/db/schema';
type Bustype = "ORDINARY" | "EXPRESS" | "DELUXE" | "SUPER_LUXURY" | "GARUDA" | "METRO_EXPRESS";
type TransportMode = "CITY_BUS" | "INTERCITY_BUS" | "METRO" | "LOCAL_TRAIN" | "EXPRESS_BUS";

@Injectable()
export class BustableService {
 async createbustable(bus_number: string,bus_type: Bustype,transport_mode: TransportMode,depo_code_number: string):Promise<{}>{
   
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
const result = await db.insert(bustable).values({bus_number,bus_type,transport_mode,capacity:finalCapacity,depo_code_number}).returning();
  return {
      message: 'Bus added successfully',
      bus: result[0],
    };
  
 }  


 async GetByBusNumber(bus_number: string) {
  const result = await db
    .select({
      bus_number: bustable.bus_number,
      bus_type: bustable.bus_type,
      capacity: bustable.capacity,
      drivercode: DriverAssignment.driver_code,
      driver_phonenumber :DriverAssignment.driver_phonenumber,
      conductor_code:ConductorAssignment.condutor_code,
      conductor_phonenumber:ConductorAssignment.conductor_phonenumber, 
      depo_id: bustable.depo_code_number,
      demo_contact_number: DEPOTtable.contact_number,
      departure_time: timmingtable.departure_time,
      arrival_time: timmingtable.arrival_time,
      source_location_id: timmingtable.source_location_id,
      destination_location_id: timmingtable.destination_location_id,
      trip_date: timmingtable.trip_date,
      stops: routetable.stops,
      status: routetable.status,
    })
    .from(bustable)
    .where(eq(bustable.bus_number, bus_number))
    .innerJoin(timmingtable, eq(timmingtable.bus_id, bustable.bus_number))
    .innerJoin(routetable,
      and(
        eq(routetable.source_location_id, timmingtable.source_location_id),
        eq(routetable.destination_location_id, timmingtable.destination_location_id)
      )
    )
    .innerJoin(DEPOTtable, eq(DEPOTtable.depo_code_number, bustable.depo_code_number)).innerJoin(DriverAssignment,eq(DriverAssignment.bus_id,bustable.bus_number)).innerJoin(ConductorAssignment,eq(ConductorAssignment.bus_id,bustable.bus_number));

  if (result.length === 0) {
    throw new BadRequestException('Invalid Bus Number, try again');
  }

  return { result };
}

  async AllBusNumber(page: number, limit: number){
     const currentPage = Math.max(1, page);
     const pageSize = Math.max(1, limit);
     const offset = (currentPage - 1) * pageSize;
      const totalRecordsResult = await db.select({ count: sql<number>`count(*)` })
         .from(timmingtable);
       const totalRecords = totalRecordsResult[0].count;
     
     const  result = await db.select({BusNumber:bustable.bus_number}).from(bustable).limit(pageSize).offset(offset);;
      return{
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
