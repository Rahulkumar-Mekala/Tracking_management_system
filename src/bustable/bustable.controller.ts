import { BadRequestException, Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { BustableService } from './bustable.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
type bustype = "ORDINARY" | "EXPRESS" | "DELUXE" | "SUPER_LUXURY" | "GARUDA" | "METRO_EXPRESS";
type TransportMode = "CITY_BUS" | "INTERCITY_BUS" | "METRO" | "LOCAL_TRAIN" | "EXPRESS_BUS";

@ApiTags('bustable')
@Controller('bustable')
export class BustableController {
    constructor(private readonly service:BustableService){}
    @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
     @Get("AllBusNumber")
    async AllBusNumber(@Query('page') page: number = 1,@Query('limit') limit: number = 10,){
       const result = await this.service.AllBusNumber(+page, +limit);
        return{
          result
        }
    }
      
      @Post("create")
      @ApiBody({
    schema: {
      type: 'object',
      properties: {
        bus_number: { type: 'string', example: 'TS08AB4567' },
        bus_type: {
          type: 'string',
          enum: ["ORDINARY", "EXPRESS", "DELUXE", "SUPER_LUXURY", "GARUDA", "METRO_EXPRESS"],
        },
        transport_mode: {
          type: 'string',
          enum: ["CITY_BUS", "INTERCITY_BUS", "METRO", "LOCAL_TRAIN", "EXPRESS_BUS"],
        },
        depo_code_number: { type: 'string', example: 'HYD-2' },
      },
      required: ['bus_number', 'bus_type', 'transport_mode', 'depo_code_number'],
    }
  })
     async createBus(@Body() body:{bus_number: string,bus_type: bustype,transport_mode:TransportMode, depo_code_number: string}){
         const result = await this.service.createbustable(body.bus_number,body.bus_type,body.transport_mode,body.depo_code_number);
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
