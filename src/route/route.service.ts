import { Injectable } from '@nestjs/common';
import { db } from 'src/db/db.connection';
import { Route } from 'src/db/schema';
 type routestatus ="on-time"|"delayed"|"cancelled"|"completed"
@Injectable()
export class RouteService {
    async createRoute(route_name:string,source_location_id:string,destination_location_id:string,stops:number[],distance_km:number,status:routestatus,estimated_time_minutes:number):Promise<{}>{
         const result = await db.insert(Route).values({route_name,source_location_id,destination_location_id, stops,distance_km,status,estimated_time_minutes}).returning();
          return{
            result
          }

    }
     
}
  