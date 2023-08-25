import { Test } from '@nestjs/testing';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';

describe('ContactsController', () => {
  let controller: ContactsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ContactsService],
      controllers: [ContactsController],
    }).compile();

    controller = module.get(ContactsController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
