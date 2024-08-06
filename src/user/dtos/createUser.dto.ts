import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  number_phone: string;

  @IsString()
  password: string;

  @IsNumber()
  role: number;
}
