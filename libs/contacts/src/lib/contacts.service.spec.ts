import { Test } from '@nestjs/testing';
import { ContactsService } from './contacts.service';

describe('ContactsService', () => {
  let service: ContactsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ContactsService],
    }).compile();

    service = module.get(ContactsService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
