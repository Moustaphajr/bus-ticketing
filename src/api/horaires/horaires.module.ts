import { Module } from '@nestjs/common';
import { HorairesService } from './horaires.service';
import { HorairesController } from './horaires.controller';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [HorairesController],
  providers: [HorairesService, PrismaService],
})
export class HorairesModule {}
