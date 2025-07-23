import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';

@Module({
  providers: [RouteService],
  controllers: [RouteController]
})
export class RouteModule {}
