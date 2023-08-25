import { Test } from '@nestjs/testing';
import { ContactGroupsService } from './contact-groups.service';

describe('ContactGroupsService', () => {
  let service: ContactGroupsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ContactGroupsService],
    }).compile();

    service = module.get(ContactGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
