import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { and, eq, gte, lte } from 'drizzle-orm';
import { db } from 'src/db/db.connection';
import { bustable, ConductorAssignment, DriverAssignment, routetable, timmingtable, User } from 'src/db/schema';
 type user_role  = 'ADMIN'|'MANAGER'|'DRIVER'|'CONDUCTOR'|'PASSENGER'
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
        bus_number: bustable.bus_number,
      bus_type:bustable.bus_type,
       capacity:bustable.capacity,
      depo_id:bustable.depo_code_number,
     
      departure_time: timmingtable.departure_time,
     stops:routetable.stops,
     status:routetable.status,
      arrival_time: timmingtable.arrival_time,
      source_location_id: timmingtable.source_location_id,
      destination_location_id: timmingtable.destination_location_id,
      trip_date: timmingtable.trip_date,
            }
           ).from(bustable).where(and(gte(bustable.Create_At,startdate),lte(bustable.Create_At,enddate))).innerJoin(timmingtable,eq(timmingtable.bus_id,bustable.bus_number)).innerJoin(routetable,and(eq(routetable.source_location_id,timmingtable.source_location_id),eq(routetable.destination_location_id,timmingtable.destination_location_id)));

            return{
                result
            }


     }
      async createDriver(fullname:string,phone:string,Gender:string,role:user_role){
         
        const result = await db.insert(User).values({fullname,phone,Gender,role}).returning();
         return {
          result
         }
      }
     async createdriverAssignment(
  driver_phonenumber: string,

  bus_id: string,
  route_id: string,
  assigned_date: string,
  shift_time: string
) {
  const [inserted] = await db
    .insert(DriverAssignment)
    .values({
      driver_phonenumber,
      bus_id,
      route_id,
      assigned_date,
      shift_time,
      driver_code: "TEMP",
    })
    .returning({ id: DriverAssignment.id });

  const driver_code = `DRV${String(inserted.id).padStart(4, "0")}`;

  const [updated] = await db
    .update(DriverAssignment)
    .set({ driver_code })
    .where(eq(DriverAssignment.id, inserted.id))
    .returning();

  return updated;
}
   

async createconductorAssignment(
  conductor_phonenumber: string,bus_id: string,route_id: string,assigned_date: string,shift_time: string,req: any) {
  if (req.user?.role !== 'ADMIN') {
    throw new ForbiddenException('Only ADMIN can assign conductors');
  }

  const [inserted] = await db
    .insert(ConductorAssignment)
    .values({conductor_phonenumber,bus_id,route_id,assigned_date,shift_time,condutor_code: "TEMP"})
    .returning({ id: ConductorAssignment.id });

  const condutor_code = `CON${String(inserted.id).padStart(4, "0")}`;

  const [updated] = await db
    .update(ConductorAssignment)
    .set({ condutor_code })
    .where(eq(ConductorAssignment.id, inserted.id))
    .returning();

  return updated;
}
}