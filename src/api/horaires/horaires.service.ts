import { FilterDto } from './dto/filter-horaire.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHoraireDto } from './dto/create-horaire.dto';
import { UpdateHoraireDto } from './dto/update-horaire.dto';
import { PrismaService } from 'src/services/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class HorairesService {
  constructor(private prisma: PrismaService) {}
  async create(CreateHoraireDto: CreateHoraireDto) {
    let newHoraireDto: Prisma.HoraireCreateInput = CreateHoraireDto;
    try {
      const newHoraire = await this.prisma.horaire.create({
        data: {
          ...newHoraireDto,
          bus: {
            connect: {
              id: CreateHoraireDto.bus,
            },
          },
        },
      });

      if (!newHoraire) {
        new HttpException(
          "erreur lors de la création d'un horaire",
          HttpStatus.BAD_REQUEST,
        );
        return newHoraire;
      }
    } catch (error) {
      throw new HttpException(
        `erreur lors de la création d'un horaire : ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(FilterDto: FilterDto): Promise<any> {
    const dateFilter = new Date(FilterDto.date);
    dateFilter.setHours(0, 0, 0, 0);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (dateFilter < currentDate) {
      throw new HttpException(
        'La date de départ est dépassée',
        HttpStatus.BAD_REQUEST,
      );
    }

    let filter: Prisma.HoraireFindManyArgs = {
      where: {
        OR: [
          {
            date: dateFilter,
            arriveeVille: FilterDto.villeArrivee,
            departVille: FilterDto.villeDepart,
          },
        ],
      },
      ...(FilterDto.skip && { skip: FilterDto.skip }),
      ...(FilterDto.take && { take: FilterDto.take }),
      ...(FilterDto.orderBy && { orderBy: FilterDto.orderBy }),
    };

    try {
      const horaires = await this.prisma.horaire.findMany(filter);
      if (!horaires) {
        throw new HttpException(
          'Aucun horaire trouvé pour les critères spécifiés',
          HttpStatus.NOT_FOUND,
        );
      }
      return horaires;
    } catch (error) {
      throw new HttpException(
        `Erreur lors de la récupération des horaires : ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    const foundedHoraire = await this.prisma.horaire.findFirstOrThrow({
      where: {
        id: id,
      },
    });
    return foundedHoraire;
  }

  async update(id: number, updateHoraireDto: UpdateHoraireDto) {
    const updateHoraire = await this.prisma.horaire.update({
      where: {
        id: id,
      },
      data: {
        ...updateHoraireDto,
        bus: {
          connect: {
            id: updateHoraireDto.bus,
          },
        },
      },
    });
    if (!updateHoraire) {
      throw new HttpException(
        'Aucun horaire trouvé avec cet identifiant',
        HttpStatus.NOT_FOUND,
      );
    }
    return updateHoraire;
  }

  async remove(id: number) {
    const deleteHoraire = await this.prisma.horaire.delete({
      where: {
        id: id,
      },
    });
    if (!deleteHoraire) {
      throw new HttpException(
        'Aucun horaire trouvé avec cet identifiant',
        HttpStatus.NOT_FOUND,
      );
    }
    return deleteHoraire;
  }
}
