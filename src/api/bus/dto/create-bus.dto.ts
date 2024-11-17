import { IsNotEmpty } from 'class-validator';

export class CreateBusDto {
  @IsNotEmpty()
  immatriculation: string;

  @IsNotEmpty()
  capacite: number;

  @IsNotEmpty()
  conducteur: string;
}
