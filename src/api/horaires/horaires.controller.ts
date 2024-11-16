import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
  Query,
} from '@nestjs/common';
import { HorairesService } from './horaires.service';
import { CreateHoraireDto } from './dto/create-horaire.dto';
import { UpdateHoraireDto } from './dto/update-horaire.dto';
import { FilterDto } from './dto/filter-horaire.dto';

@Controller('/api/horaires')
export class HorairesController {
  constructor(private readonly horairesService: HorairesService) {}

  @Post()
  async create(@Body() createHoraireDto: CreateHoraireDto, @Res() res) {
    return this.horairesService.create(createHoraireDto);
  }

  @Get()
  findAll(@Query() FilterDto: FilterDto) {
    return this.horairesService.findAll(FilterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.horairesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateHoraireDto: UpdateHoraireDto) {
    return this.horairesService.update(+id, updateHoraireDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.horairesService.remove(+id);
  }
}
