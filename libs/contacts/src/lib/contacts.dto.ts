import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateContactDTO {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  phoneNumber!: string;

  @IsNotEmpty()
  address!: string;

  @IsNotEmpty()
  email!: string;

  @IsOptional()
  userId?: string;

  @IsOptional()
  contactGroupIds?: string[];
}

export class UpdateContactDTO extends CreateContactDTO {}
