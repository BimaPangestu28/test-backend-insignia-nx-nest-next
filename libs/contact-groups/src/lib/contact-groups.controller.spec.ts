import { Test } from '@nestjs/testing';
import { ContactGroupsController } from './contact-groups.controller';
import { ContactGroupsService } from './contact-groups.service';

describe('ContactGroupsController', () => {
  let controller: ContactGroupsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ContactGroupsService],
      controllers: [ContactGroupsController],
    }).compile();

    controller = module.get(ContactGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
