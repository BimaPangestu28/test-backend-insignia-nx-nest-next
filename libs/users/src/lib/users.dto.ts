import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  role: string;
}

export class UpdateUserDTO {
  @IsNotEmpty()
  email: string;

  @IsOptional()
  password?: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  role: string;
}
