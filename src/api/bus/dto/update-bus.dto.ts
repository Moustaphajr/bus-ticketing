import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateBusDto {
  @IsNotEmpty()
  @IsString()
  immatriculation: string;

  @IsNotEmpty()
  @IsNumber()
  capacite: number;

  @IsNotEmpty()
  @IsString()
  conducteur: string;
}
