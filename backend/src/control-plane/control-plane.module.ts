import { Module } from '@nestjs/common';
import { ControlPlaneController } from './control-plane.controller';
import { ControlPlaneService } from './control-plane.service';

@Module({
  controllers: [ControlPlaneController],
  providers: [ControlPlaneService],
})
export class ControlPlaneModule {}
