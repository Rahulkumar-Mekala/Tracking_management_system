import { Injectable } from '@nestjs/common';
import { and, eq, gte, lte } from 'drizzle-orm';
import { db } from 'src/db/db.connection';
import { Bus, Route, Timing } from 'src/db/schema';

@Injectable()
export class ManagerService {
     async getByDateRange( start:string, end:string){

       function parseDate(ddmmyyyy:string): Date {
          const[day,mount,year]=ddmmyyyy.split('/');
          if (!day||!mount||!year) {
             throw new Error("Invalidate date format. use dd/mm/yyyy.");
              
            
          }
           return new Date(`${year}-${mount}-${day}`);

         
       }
         const startdate= parseDate(start);
          const enddate=parseDate(end);
           console.log("start"+startdate);
           console.log("end"+enddate);
              


           const result =  await db.select(
            {
        bus_number: Bus.bus_number,
      bus_type:Bus.bus_type,
       capacity:Bus.capacity,
      depo_id:Bus.depo_id,
     
      departure_time: Timing.departure_time,
     stops:Route.stops,
     status:Route.status,
      arrival_time: Timing.arrival_time,
      source_location_id: Timing.source_location_id,
      destination_location_id: Timing.destination_location_id,
      trip_date: Timing.trip_date,
            }
           ).from(Bus).where(and(gte(Bus.Create_At,startdate),lte(Bus.Create_At,enddate))).innerJoin(Timing,eq(Timing.bus_id,Bus.bus_number)).innerJoin(Route,and(eq(Route.source_location_id,Timing.source_location_id),eq(Route.destination_location_id,Timing.destination_location_id)));

            return{
                result
            }


     }

}
