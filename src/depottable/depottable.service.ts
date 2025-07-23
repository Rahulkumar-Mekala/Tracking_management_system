import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from 'src/db/db.connection';
import { Depot } from 'src/db/schema';

@Injectable()
export class DepottableService {
    async createdepottable(depo_code_number:string,depo_name:string,location:string,contact_number){
         
         const result = await db.insert(Depot).values({depo_code_number,depo_name,location,contact_number}).returning();

       return{
        result
       }
     }
      async AllDepoDetails(){
         const result = await db.select().from(Depot);
          return{
            result
          }
      }
       async DepoDetailsById(id:string){
         const result = await db.select().from(Depot).where(eq(Depot.depo_code_number,id));
          return {
            result
       }
    }
     async DepotUpdate(DepoCodeNumber:string,depo_name:string,location:string,contact_number){
         const result = await db.update(Depot).set({depo_name,location,contact_number,Update_At:new Date}).where(eq(Depot.depo_code_number,DepoCodeNumber)).returning();
          return  {
             result
          }      
     }
    async DepotDelete(id: string): Promise<{ message: string; deletedRows: number }> {
  
  const result = await db.delete(Depot).where(eq(Depot.depo_code_number,id));

  return {
    message: 'Depot deleted successfully',
    deletedRows: result.rowCount ?? 0 
   };
 }
}
