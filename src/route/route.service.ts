import { BadRequestException, Injectable } from '@nestjs/common';
import { db } from 'src/db/db.connection';
import { routetable } from 'src/db/schema';
import { eq} from 'drizzle-orm';


type Stop = {
  stop_name: string;
  status: "ACTIVE" | "INACTIVE";
  arrival_time: string;
  departure_time: string;
};
@Injectable()
export class RouteService {
  async createRoute(route_name: string,source_location_id: string,destination_location_id: string,stops: Stop[],distance_km: number,status: "ACTIVE" | "INACTIVE" | "CANCELLED",estimated_time_minutes: number) {
  try {
      const result = await db.insert(routetable).values({route_name,source_location_id,destination_location_id,stops, distance_km,status,estimated_time_minutes}).returning();

      return {
        message: 'Route created successfully',
        data: result[0],
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
//   async getAllRoutes() {
//     return await db.select().from(routetable);
//   }

//   async getRouteById(id: number) {
//     const route = await db
//       .select()
//       .from(routetable)
//       .where(routetable.route_id.eq(id));

//     if (!route.length) {
//       throw new BadRequestException('Route not found');
//     }
//     return route[0];
//   } 
}
  