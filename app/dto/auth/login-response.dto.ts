import {
  IsString,
  IsEmail,
  IsDefined,
} from 'class-validator';
    
export class LoginResponseDto {
  @IsDefined()
    id: number;
    
  @IsString()
  @IsDefined()
    first_name: string;
  
  @IsString()
  @IsDefined()
    last_name: string;
  
  @IsString()
  @IsEmail()
  @IsDefined()
    email: string;
}