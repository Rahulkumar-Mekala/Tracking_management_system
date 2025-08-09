import { Injectable } from '@nestjs/common';
import { db } from 'src/db/db.connection';
import { locationtable } from 'src/db/schema';

@Injectable()
export class LocationtableService {
      async createlocationtable(location_name:string,city:string,state:string,pincode:string):Promise<{}>{
         const result = await db.insert(locationtable).values({location_name,city,state,pincode}).returning();
         return{
            result
       }
      }
        async Alllocation(){
             const result = await db.select().from(locationtable);
             return result
        }
}
