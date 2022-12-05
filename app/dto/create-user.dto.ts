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

  @IsNumber({}, { each: true })
  @IsArray()
  @IsOptional()
  @IsPositive({ each: true })
    perfiles?: number[];

  @IsNumber({}, { each: true })
  @IsArray()
  @IsOptional()
  @IsPositive({ each: true })
    roles?: number[];
}