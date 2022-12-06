import {
  IsString,
  IsNumber,
  IsOptional,
  IsPositive,
  IsArray,
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

  @IsNumber({}, { each: true })
  @IsArray()
  @IsOptional()
  @IsPositive({ each: true })
    profiles?: number[];
}