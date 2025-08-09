import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import { AuthController } from './auth/auth.controller';
import { DepottableModule } from './depottable/depottable.module';
import { LoginModule } from './login/login.module';
import { AuthModule } from './auth/auth.module';
import { BustableModule } from './bustable/bustable.module';
import { LocationtableModule } from './locationtable/locationtable.module';
import { TimingModule } from './timing/timing.module';
import { RouteModule } from './route/route.module';
import { ManagerModule } from './manager/manager.module';
import { DriverModule } from './driver/driver.module';
import { ConductorModule } from './conductor/conductor.module';
import { LiveTrackingModule } from './live-tracking/live-tracking.module';


@Module({
  imports: [ProfileModule, LoginModule, DepottableModule,AuthModule, BustableModule, LocationtableModule, TimingModule, RouteModule, ManagerModule, DriverModule, ConductorModule, LiveTrackingModule,],
  controllers: [AppController ],
  providers: [AppService],
})
export class AppModule {}
