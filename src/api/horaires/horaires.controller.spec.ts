import { Test, TestingModule } from '@nestjs/testing';
import { HorairesController } from './horaires.controller';
import { HorairesService } from './horaires.service';

describe('HorairesController', () => {
  let controller: HorairesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HorairesController],
      providers: [HorairesService],
    }).compile();

    controller = module.get<HorairesController>(HorairesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
