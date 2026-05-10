import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControlPlaneModule } from './control-plane/control-plane.module';

@Module({
  imports: [ControlPlaneModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
