import { FilterBusDto } from './dto/filter-bus.dto';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class BusService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createBusDto: CreateBusDto) {
    const existingBus = this.prisma.bus.findUnique({
      where: {
        immatriculation: createBusDto.immatriculation,
      },
    });
    if (existingBus) {
      throw new HttpException('bus déjà existant', HttpStatus.BAD_REQUEST);
    }

    const newBus = await this.prisma.bus.create({
      data: createBusDto,
    });
    if (!newBus) {
      throw new HttpException(
        'erreur lors de la création de bus',
        HttpStatus.BAD_REQUEST,
      );
    }
    return newBus;
  }

  async findAll(FilterBusDto: FilterBusDto) {
    let filter: Prisma.BusFindManyArgs = {
      where: {
        conducteur: FilterBusDto.conducteur,
      },
      ...(FilterBusDto.skip && { skip: Number(FilterBusDto.skip) }),
      ...(FilterBusDto.take && { take: Number(FilterBusDto.take) }),
    };
    return await this.prisma.bus.findMany(filter);
  }

  async findOne(id: number) {
    const foundedBus = await this.prisma.bus.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    return foundedBus;
  }

  async update(id: number, updateBusDto: UpdateBusDto) {
    const updatedBus = await this.prisma.bus.update({
      where: {
        id: id,
      },
      data: updateBusDto,
    });
    if (!updatedBus) {
      throw new HttpException(
        'erreur lors de la mise à jour du bus',
        HttpStatus.BAD_REQUEST,
      );
    }
    return updatedBus;
  }

  remove(id: number) {
    const busToDelete = this.prisma.bus.delete({
      where: {
        id: id,
      },
    });
    if (!busToDelete) {
      throw new HttpException(
        'erreur lors de la suppression du bus',
        HttpStatus.BAD_REQUEST,
      );
    }
    return busToDelete;
  }
}
