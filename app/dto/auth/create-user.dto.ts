import {
  IsString,
  IsNumber,
  IsEmail,
  IsDefined,
} from 'class-validator';

export class CreateUserDto {

  @IsString()
  @IsEmail()
  @IsDefined()
    email: string;

  @IsString()
  @IsDefined()
    password: string;

  @IsString()
  @IsDefined()
    first_name: string;

  @IsString()
  @IsDefined()
    last_name: string;

  @IsNumber()
  @IsDefined()
    profile_id: number;
}