import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateContactGroupDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  userId?: string;

  @IsOptional()
  contactIds?: string[];
}

export class UpdateContactGroupDTO extends CreateContactGroupDTO {}
