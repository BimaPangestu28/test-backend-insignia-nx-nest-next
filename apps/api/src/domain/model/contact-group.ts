import { ContactModel } from './contact';
import { UserModel } from './user';

export class ContactGroupModel {
  id: string;
  name: string;
  description: string;

  user: UserModel;
  contactList: ContactModel[];
}
