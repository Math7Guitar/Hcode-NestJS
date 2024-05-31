import { Test, TestingModule } from '@nestjs/testing';
import { UsrService } from './usr.service';

describe('UsrService', () => {
  let service: UsrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsrService],
    }).compile();

    service = module.get<UsrService>(UsrService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
