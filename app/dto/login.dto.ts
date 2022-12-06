import {
  IsString,
  IsEmail,
  IsDefined,
} from 'class-validator';
  
export class LoginDto {
  
  @IsString()
  @IsEmail()
  @IsDefined()
    email: string;
  
  @IsString()
  @IsDefined()
    password: string;
}