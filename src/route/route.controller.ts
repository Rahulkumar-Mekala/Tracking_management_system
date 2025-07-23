import { Body, Controller, Post } from '@nestjs/common';
import { RouteService } from './route.service';
type routestatus ="on-time"|"delayed"|"cancelled"|"completed"
@Controller('route')
export class RouteController {
     constructor(private readonly service:RouteService){}
     @Post("create")
      async createRoute(@Body() body:{route_name:string,source_location_id:string,destination_location_id:string,stops:number[],distance_km:number,status:routestatus,estimated_time_minutes:number}){
         const result  =await this.service.createRoute(body.route_name,body.source_location_id,body.destination_location_id,body.stops,body.distance_km,body.status,body.estimated_time_minutes);
          return{
            result
          }

      }
}
