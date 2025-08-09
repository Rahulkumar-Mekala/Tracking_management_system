import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from 'src/db/db.connection';
import { DriverAssignment } from 'src/db/schema';

@Injectable()
export class DriverService {
     async findbyphonenumber(phone:string){
         const result = await db.select().from(DriverAssignment).where(eq(DriverAssignment.driver_phonenumber,phone));
          return result

     }
    
}
