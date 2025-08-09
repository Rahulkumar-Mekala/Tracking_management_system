import { Module } from '@nestjs/common';
import { ConductorService } from './conductor.service';
import { ConductorController } from './conductor.controller';

@Module({
  providers: [ConductorService],
  controllers: [ConductorController]
})
export class ConductorModule {}
