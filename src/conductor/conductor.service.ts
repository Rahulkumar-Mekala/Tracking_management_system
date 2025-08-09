import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from 'src/db/db.connection';
import { ConductorAssignment } from 'src/db/schema';

@Injectable()
export class ConductorService {
       async findbyphonenumber(phone:string){
             const result = await db.select().from(ConductorAssignment).where(eq(ConductorAssignment.conductor_phonenumber,phone));
              return result
    
         }
        
}
