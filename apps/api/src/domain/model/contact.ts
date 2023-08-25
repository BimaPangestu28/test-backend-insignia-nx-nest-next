import { UserModel } from './user';
import { ContactGroupModel } from './contact-group';

export class ContactModel {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  user: UserModel;
  contactGroups: ContactGroupModel[];
}
