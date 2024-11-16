import { Test, TestingModule } from '@nestjs/testing';
import { HorairesService } from './horaires.service';

describe('HorairesService', () => {
  let service: HorairesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HorairesService],
    }).compile();

    service = module.get<HorairesService>(HorairesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
