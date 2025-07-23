import { Module } from '@nestjs/common';
import { LocationtableService } from './locationtable.service';
import { LocationtableController } from './locationtable.controller';

@Module({
  providers: [LocationtableService],
  controllers: [LocationtableController]
})
export class LocationtableModule {}
