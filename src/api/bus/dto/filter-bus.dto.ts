import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FilterBusDto {
  @IsNotEmpty()
  skip: number;

  @IsNotEmpty()
  take: number;

  @IsOptional()
  @IsString()
  conducteur: string;
}
