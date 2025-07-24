import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TimingService } from './timing.service';

@Controller('timing')
export class TimingController {
     constructor(private readonly service:TimingService){}
      @Post("create")
      async createtiming(@Body() body:{bus_id:string,source_location_id:string,destination_location_id:string,departure_time:string,arrival_time:string,trip_date:string}){
         const result = await this.service.createtimmingtable(body.bus_id,body.source_location_id,body.destination_location_id,body.departure_time,body.arrival_time,body.trip_date);
          return{
            result
          }

      }
  @Post("sourcedestination")
async sourceAndDestination(@Body() body: { source_location_id: string; destination_location_id: string }) {
  const result = await this.service.sourceanddestination(body.source_location_id,body.destination_location_id);

  return { 
    result
   };
}

 @Get("ALl")
  async All(){
     const result = await this.service.AllDetails();
      return result;
  }
 
  @Get('AllSorceandDestination')
  async AllTiming(@Query('page') page: number = 1,@Query('limit') limit: number = 10,
  ) {
    const result = await this.service.getTimingWithPagination(+page, +limit);
    return result;
  }
}
