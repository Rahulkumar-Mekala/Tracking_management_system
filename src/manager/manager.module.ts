import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';

@Module({
  providers: [ManagerService],
  controllers: [ManagerController]
})
export class ManagerModule {}
