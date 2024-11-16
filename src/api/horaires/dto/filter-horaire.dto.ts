import { Prisma } from '@prisma/client';
import { IsOptional } from 'class-validator';

export class FilterDto {
  @IsOptional()
  skip: number;

  @IsOptional()
  take: number;

  @IsOptional()
  where: Prisma.HoraireWhereInput;

  orderBy: Prisma.HoraireOrderByWithRelationInput;

  @IsOptional()
  date: Date;

  @IsOptional()
  villeArrivee: string;

  @IsOptional()
  villeDepart: string;
}
