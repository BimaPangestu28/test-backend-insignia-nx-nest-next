import { Test } from '@nestjs/testing';
import { AuthenticationsService } from './authentications.service';

describe('AuthenticationsService', () => {
  let service: AuthenticationsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthenticationsService],
    }).compile();

    service = module.get(AuthenticationsService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
