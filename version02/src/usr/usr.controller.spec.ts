import { Test, TestingModule } from '@nestjs/testing';
import { UsrController } from './usr.controller';
import { UsrService } from './usr.service';

describe('UsrController', () => {
  let controller: UsrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsrController],
      providers: [UsrService],
    }).compile();

    controller = module.get<UsrController>(UsrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
