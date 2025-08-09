import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DepottableService } from './depottable.service';

@Controller('depottable')
export class DepottableController {
    constructor(private readonly service:DepottableService){}
       @Get("AllDetails")
      async AllDetails(){
         const result = await this.service.AllDepoDetails();
          return{
            result
          }

      }
       @Get("DepoDetailsByid")
        async DepoDetailsById(@Param('id') id:string){
             const result = await this.service.DepoDetailsById(id);
              return {
                result
              }

        }
       @Post('create')
async createDepo(@Body() body: any) {
  return this.service.createdepottable(
    body.depo_code_number,
    body.depo_name,
    body.location,
    body.contact_number
  );

          }
          @Post("update/:id")
           async update(@Param('id')DepoCodeNumber:string, @Body() body:{depo_name:string,location:string,contact_number:string} ){
             const result = await this.service.DepotUpdate(DepoCodeNumber,body.depo_name,body.location,body.contact_number);
              return{
                result
              }
           }
            @Delete("Delete/:id")
             async Delete(@Body() body:{ id:string}){
                const result = await this.service.DepotDelete(body.id);
                 return{
                    result
                 }
             }
}
