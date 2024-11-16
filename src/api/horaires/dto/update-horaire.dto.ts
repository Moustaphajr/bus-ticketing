import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { CreateHoraireDto } from './create-horaire.dto';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';

export class UpdateHoraireDto {
  @IsNotEmpty()
  @IsString()
  departVille: string;

  @IsNotEmpty()
  @IsString()
  arriveeVille: string;

  @IsNotEmpty()
  @Matches(/^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/, {
    message: "L'heure de départ doit être au format HH:mm (ex: 08:30)",
  })
  departHeure: string;

  @IsNotEmpty()
  @Matches(/^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/, {
    message: "L'heure de d'arrivée doit être au format HH:mm (ex: 08:30)",
  })
  arriveeHeure: string;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsOptional()
  @IsNumber()
  duree: number;

  bus: any;
}
