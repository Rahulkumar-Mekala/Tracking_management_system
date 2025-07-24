import { Controller, Get, Query } from '@nestjs/common';
import { ManagerService } from './manager.service';

@Controller('manager')
export class ManagerController {
     constructor(private readonly service :ManagerService){}
     @Get("by-date")
     async getDate(@Query('start') start:string,@Query('end') end:string){
       const result = await this.service.getByDateRange(start,end);
        return{
          result
        }
     }
}
