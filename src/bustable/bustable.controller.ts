import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { BustableService } from './bustable.service';
type bustype = "ORDINARY" | "EXPRESS" | "DELUXE" | "SUPER_LUXURY" | "GARUDA" | "METRO_EXPRESS";

@Controller('bustable')
export class BustableController {
    constructor(private readonly service:BustableService){}
     @Get("AllBusNumber")
    async AllBusNumber(){
       const result = await this.service.AllBusNumber();
        return{
          result
        }
    }
     @Post("create")
     async createBus(@Body() body:{bus_number: string,bus_type: bustype,depo_id: string}){
         const result = await this.service.createbustable(body.bus_number,body.bus_type,body.depo_id);
          return{
            result
          }

     }
      @Post("Busnumber")
      async GetByBus(@Body() body:{busnumber:string}){
         const result = await this.service.GetByBusNumber(body.busnumber);
         
          return result
      }
     
}
