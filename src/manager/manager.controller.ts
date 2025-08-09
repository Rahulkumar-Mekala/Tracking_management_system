import {Body,Controller,ForbiddenException,Post,Req, UseGuards,} from '@nestjs/common';
import { ManagerService } from './manager.service';
import {ApiBearerAuth,ApiBody,ApiOperation,ApiTags} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

type UserRole = 'ADMIN' | 'MANAGER' | 'DRIVER' | 'CONDUCTOR' | 'PASSENGER';


@ApiTags('Manager')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('access-token')
@Controller('manager')
export class ManagerController {
  constructor(private readonly service: ManagerService) {}

  @Post('by-date')
  @ApiOperation({ summary: 'Get data by date range' })
  async getByDateRange(
    @Body() body: { start: string; end: string }
  ): Promise<any> {
    const result = await this.service.getByDateRange(body.start, body.end);
    return { result };
  }

  @Post('createdriver')
  @ApiOperation({ summary: 'Create a new driver' })
  async createDriver(
    @Body() body: {
      fullname: string;
      phone: string;
      Gender: string;
      role: UserRole;
    }
  ): Promise<any> {
    const result = await this.service.createDriver(
      body.fullname,
      body.phone,
      body.Gender,
      body.role
    );
    return { result };
  }

  @Post('DriverAssignment')
  @ApiOperation({ summary: 'Assign a driver to a bus and route' })
  async assignDriver(
    @Body() body: {
      driver_phonenumber: string;
      bus_id: string;
      route_id: string;
      assigned_date: string;
      shift_time: string;
    }
  ): Promise<any> {
    const result = await this.service.createdriverAssignment(
      body.driver_phonenumber,
      body.bus_id,
      body.route_id,
      body.assigned_date,
      body.shift_time
    );
    return { result };
  }

  @Post('conductorAssignment')

  @ApiOperation({ summary: 'Assign a conductor to a bus and route' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        conductor_phonenumber: { type: 'string', example: '9876543210' },
        bus_id: { type: 'string', example: 'BUS123' },
        route_id: { type: 'string', example: 'ROUTE456' },
        assigned_date: { type: 'string', example: '2025-08-08' },
        shift_time: { type: 'string', example: '09:00-13:00' },
      },
      required: [
        'conductor_phonenumber',
        'bus_id',
        'route_id',
        'assigned_date',
        'shift_time',
      ],
    },
  })
  async assignConductor(
    @Req() req: any,
    @Body()
    body: {
      conductor_phonenumber: string;
      bus_id: string;
      route_id: string;
      assigned_date: string;
      shift_time: string;
    }
  ): Promise<any> {
     console.log(req.user);
     
    if (req.user?.role !== 'ADMIN') {
      console.log(req.user)
      throw new ForbiddenException('Access denied. Admins only.');
     
    }

    const result = await this.service.createconductorAssignment(body.conductor_phonenumber,body.bus_id,body.route_id,body.assigned_date,body.shift_time,req);
       console.log(req.user);

    return { result };
  }
}
