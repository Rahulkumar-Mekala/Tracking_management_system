import { Body, Controller, Post } from '@nestjs/common';
import { LocationtableService } from './locationtable.service';

@Controller('locationtable')
export class LocationtableController {
     constructor(private readonly service:LocationtableService){}
    @Post('create')
    async createlocation(@Body() body:{location_name:string,city:string,state:string,pincode:string}){
        const result = await this.service.createlocationtable(body.location_name,body.city,body.state,body.pincode);
         return{
            result
         }
    }
}
