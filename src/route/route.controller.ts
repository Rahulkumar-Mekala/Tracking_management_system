import { Body, Controller, Post } from '@nestjs/common';
import { RouteService } from './route.service';
import { ApiBody } from '@nestjs/swagger';
type routestatus ="on-time"|"delayed"|"cancelled"|"completed"

type Stop = {
  stop_name: string;
  status: 'ACTIVE' | 'INACTIVE';
  arrival_time: string;
  departure_time: string;
};
@Controller('route')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Post('create')
  @ApiBody({ 
    schema: {
      type: 'object',
      properties: {
        route_name: { type: 'string', example: 'Mehdipatnam to Uppal' },
        source_location_id: { type: 'string', example: 'Mehdipatnam' },
        destination_location_id: { type: 'string', example: 'Uppal' },
        stops: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              stop_name: { type: 'string', example: 'Koti' },
              status: { type: 'string', example: 'ACTIVE' },
              arrival_time: { type: 'string', example: '06:15' },
              departure_time: { type: 'string', example: '06:20' }
            },
            required: ['stop_name', 'status', 'arrival_time', 'departure_time']
          }
        },
        distance_km: { type: 'number', example: 15 },
        status: { type: 'string', enum: ['ACTIVE', 'INACTIVE', 'CANCELLED'], example: 'ACTIVE' },
        estimated_time_minutes: { type: 'number', example: 45 }
      },
      required: [
        'route_name',
        'source_location_id',
        'destination_location_id',
        'stops',
        'distance_km',
        'status',
        'estimated_time_minutes'
      ],
    },
  })
  async createRoute(
    @Body() body: {route_name: string;source_location_id: string;destination_location_id: string;stops: Stop[];distance_km: number;status: "ACTIVE" | "INACTIVE" | "CANCELLED";estimated_time_minutes: number}) {
    const result = await this.routeService.createRoute(body.route_name,body.source_location_id,body.destination_location_id,body.stops,body.distance_km,body.status,body.estimated_time_minutes);
    return result;
  }
}

