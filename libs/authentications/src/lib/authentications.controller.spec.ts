import { Test } from '@nestjs/testing';
import { AuthenticationsController } from './authentications.controller';
import { AuthenticationsService } from './authentications.service';

describe('AuthenticationsController', () => {
  let controller: AuthenticationsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthenticationsService],
      controllers: [AuthenticationsController],
    }).compile();

    controller = module.get(AuthenticationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
