import { PrismaService } from './services/prisma.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HorairesModule } from './api/horaires/horaires.module';
import { BusModule } from './api/bus/bus.module';

@Module({
  imports: [HorairesModule, BusModule],
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class AppModule {}
